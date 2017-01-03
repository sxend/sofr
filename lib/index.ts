import {getTopLevelWindow} from './utils/WindowUtils';

let topLevel: Window = getTopLevelWindow(window);

window["sofr"] = window["sofr"] || {};
