import {library, dom, icon} from '@fortawesome/fontawesome-svg-core'
import {faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faAngleUp, faThumbtack, faBullhorn, faStar, faQuoteLeft, faPencilAlt, faEnvelope, faClipboardCheck, faIdCardAlt, faHandshake, faBriefcase, faGlassMartini, faCalendarCheck, faInfo, faHaykal} from '@fortawesome/free-solid-svg-icons'
import {faWheat} from '@fortawesome/pro-solid-svg-icons'
import {faSearch} from '@fortawesome/pro-regular-svg-icons'

export default class FontAwesome {
  constructor() {
    // free-brands-svg-icons
    library.add(faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram)

    // free-solid-svg-icons
    library.add(faAngleUp, faThumbtack, faBullhorn, faStar, faQuoteLeft, faPencilAlt, faEnvelope, faClipboardCheck, faIdCardAlt, faHandshake, faBriefcase, faGlassMartini, faCalendarCheck, faInfo, faHaykal)

    // pro-solid-svg
    library.add(faWheat)

    // pro-regular-svg
    library.add(faSearch)

    dom.watch();
  }
}
