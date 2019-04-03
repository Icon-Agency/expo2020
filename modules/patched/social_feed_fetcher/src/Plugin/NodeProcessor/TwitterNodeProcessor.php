<?php

namespace Drupal\social_feed_fetcher\Plugin\NodeProcessor;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Language\Language;
use Drupal\media\Entity\Media;
use Drupal\node\NodeInterface;
use Drupal\social_feed_fetcher\PluginNodeProcessorPluginBase;

/**
 * Class TwitterNodeProcessor
 *
 * @package Drupal\social_feed_fetcher\Plugin\NodeProcessor
 *
 * @PluginNodeProcessor(
 *   id = "twitter_processor",
 *   label = @Translation("Twitter node processor")
 * )
 */
class TwitterNodeProcessor extends PluginNodeProcessorPluginBase {

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function processItem($source, $data_item) {
    if (isset($data_item->id) && !$this->isPostIdExist($data_item->id)) {

      $preparation_array = [
        'type'                   => 'news',
        'title'                  => 'Tweet ' . $data_item->id,
        'field_twitter_post_id'  => $data_item->id,
        'field_news_media_type' => [
          'target_id' => $data_item->twitter_tid,
        ],
        'field_is_twitter_feed'  => '1',
        'body'                   => [
          'value'  => social_feed_fetcher_linkify(html_entity_decode($data_item->full_text)),
          'format' => $this->config->get('formats_post_format'),
        ],
        'field_media_date'           => $this->setPostTime($data_item->created_at),
      ];

      if (isset($data_item->entities->media[0]->media_url_https)){
        $preparation_array['field_media'] = [
          'target_id' => $this->processImageFile($data_item->entities->media[0]->media_url_https, 'public://twitter'),
        ];
      }

      $node = $this->entityStorage->create($preparation_array);

      return $node->save();
    }
    return FALSE;
  }

  /**
   * Save external file.
   *
   * @param $filename
   * @param $path
   *
   * @return int
   */
  public function processImageFile($filename, $path) {
    $name = basename($filename);
    $data = file_get_contents($filename);
    $uri = $path . '/' . $name;
    file_prepare_directory($path, FILE_CREATE_DIRECTORY);
    $uri = explode('?', $uri);
    $file_saved = file_save_data($data, $uri[0], FILE_EXISTS_REPLACE);

    if (!$file_saved){
      return NULL;
    }

    $result = \Drupal::entityQuery('media')
                     ->condition('status' , 1)
                     ->condition('bundle', 'image')
                     ->condition('field_media_image', $file_saved->id())
                     ->execute();

    $media_id = reset($result);

    if (!empty($media_id)){
      return $media_id;
    }

    $image_media = Media::create([
      'bundle' => 'image',
      'uid' => '1',
      'langcode' => \Drupal::languageManager()->getDefaultLanguage()->getId(),
      'status' => NodeInterface::PUBLISHED,
      'name' => t('tweeter image ' . $name),
      'field_media_image' => [
        'target_id' => $file_saved->id(),
        'alt' => t('tweeter image ' . $name),
      ],
    ]);
    $image_media->save();

    return $image_media->id();
  }


  /**
   * {@inheritdoc}
   */
  public function isPostIdExist($data_item_id){

    if($data_item_id) {
      $result = $this->entityStorage->getQuery()
                       //            ->condition('status', 1)
                                   ->condition('type', 'news')
                                   ->condition('field_twitter_post_id', $data_item_id)
                                   ->execute();
      return $result;
    }

    return NULL;
  }

}
