import {library, dom, icon} from '@fortawesome/fontawesome-svg-core'
import {faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faAngleUp, faSearch} from '@fortawesome/free-solid-svg-icons'

export default class FontAwesome {
  constructor() {
    // free-brands-svg-icons
    library.add(faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram)

    // free-solid-svg-icons
    library.add(faAngleUp, faSearch)

    dom.watch();
  }
}
