import telefoonNfout from './audio/telefoon-fout.mp3'
import telefoonGoed from './audio/telefoon-goed.mp3'

import instruction from './audio/instruction.mp3'
import case1 from './audio/case1.mp3'
import case2 from './audio/case2.mp3'
import case3 from './audio/case3.mp3'
import case4 from './audio/case4.mp3'
import case5 from './audio/case5.mp3'
import case6 from './audio/case6.mp3'
import case7 from './audio/case7.mp3'

import step_1 from './images/cleanup/cleanup_stap_1.gif'
import MicrosoftIcon from './images/common/Microsoft.png'
import RetrieveCase from './images/common/RetrieveCase.png'
import splashscreenIcon from './images/common/splashscreen.png'
import splashscreenIconGrey from './images/common/splashscreen2.png'
import StartInstruction from './images/common/StartInstruction.svg'
import SmartBar from './images/common/smartbar.jpg'
import watermark from './images/common/watermark.png'
import WindowsIcon from './images/common/WIN22_Windows11_logo_horiz_blue_rgb.png'
import xbox from './images/common/XBOXseriesX.jpg'
import XboxIcon from './images/common/Xbox_2020_horz_Grn_RGB.png'
import playIcon from './images/common/play.png'
import pauseIcon from './images/common/pause.png'

import game1Clue from './images/game-clue/game1clue.png'
import game2Clue from './images/game-clue/game2clue.png'
import game4Clue from './images/game-clue/game4clue.png'
import game3Clue from './images/game-clue/insta_fav.webp'
import hint2b from './images/hints/hint2b.png'
import GBIcon from './images/language/GB.svg'
import NLIcon from './images/language/NL.svg'

import player1 from './images/character/1.png'
import player2 from './images/character/2.png'
import player3 from './images/character/3.png'
import player4 from './images/character/4.png'
import player5 from './images/character/5.png'
import player6 from './images/character/6.png'
import player7 from './images/character/7.png'
import playerGray from './images/character/union.png'

const assets = {
  images: {
    language: {
      GBIcon,
      NLIcon,
    },
    character: {
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      playerGray,
    },
    common: {
      splashscreenIcon,
      splashscreenIconGrey,
      watermark,
      xbox,
      StartInstruction,
      RetrieveCase,
      SmartBar,
      MicrosoftIcon,
      WindowsIcon,
      XboxIcon,
      playIcon,
      pauseIcon,
    },
    hints: {
      hint2b,
    },
    cleanups: [step_1],
    clues: {
      game1Clue,
      game2Clue,
      game3Clue,
      game4Clue,
    },
  },
  audio: {
    telefoonNfout,
    telefoonGoed,
    instruction,
    case1,
    case2,
    case3,
    case4,
    case5,
    case6,
    case7,
  },
}

export default assets
