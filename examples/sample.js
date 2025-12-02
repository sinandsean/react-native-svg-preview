"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgWithText = exports.SettingsIcon = exports.HeartIcon = exports.GradientPath = exports.RoundedRect = exports.SimpleCircle = void 0;
const react_1 = __importDefault(require("react"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
// Example 1: Simple Circle
const SimpleCircle = () => (<react_native_svg_1.default width={100} height={100} viewBox="0 0 100 100">
    <react_native_svg_1.Circle cx={50} cy={50} r={40} fill="blue" stroke="black" strokeWidth={2}/>
  </react_native_svg_1.default>);
exports.SimpleCircle = SimpleCircle;
// Example 2: Rectangle with rounded corners
const RoundedRect = () => (<react_native_svg_1.default width={200} height={100}>
    <react_native_svg_1.Rect x={10} y={10} width={180} height={80} rx={15} ry={15} fill="#4CAF50" stroke="#2E7D32" strokeWidth={3}/>
  </react_native_svg_1.default>);
exports.RoundedRect = RoundedRect;
// Example 3: Path with gradient
const GradientPath = () => (<react_native_svg_1.default width={200} height={200} viewBox="0 0 200 200">
    <react_native_svg_1.Defs>
      <react_native_svg_1.LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <react_native_svg_1.Stop offset="0%" stopColor="#FF6B6B"/>
        <react_native_svg_1.Stop offset="100%" stopColor="#4ECDC4"/>
      </react_native_svg_1.LinearGradient>
    </react_native_svg_1.Defs>
    <react_native_svg_1.Path d="M100 10 L190 80 L160 190 L40 190 L10 80 Z" fill="url(#grad)" stroke="#333" strokeWidth={2}/>
  </react_native_svg_1.default>);
exports.GradientPath = GradientPath;
// Example 4: Heart icon
const HeartIcon = () => (<react_native_svg_1.default width={100} height={100} viewBox="0 0 24 24">
    <react_native_svg_1.Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E91E63"/>
  </react_native_svg_1.default>);
exports.HeartIcon = HeartIcon;
// Example 5: Complex icon with groups
const SettingsIcon = () => (<react_native_svg_1.default width={48} height={48} viewBox="0 0 24 24">
    <react_native_svg_1.G fill="none" stroke="#607D8B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <react_native_svg_1.Circle cx={12} cy={12} r={3}/>
      <react_native_svg_1.Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </react_native_svg_1.G>
  </react_native_svg_1.default>);
exports.SettingsIcon = SettingsIcon;
// Example 6: Text element
const SvgWithText = () => (<react_native_svg_1.default width={200} height={100} viewBox="0 0 200 100">
    <react_native_svg_1.Rect width={200} height={100} fill="#f0f0f0"/>
    <react_native_svg_1.Text x={100} y={55} fontSize={24} fontWeight="bold" fill="#333" textAnchor="middle">
      Hello SVG!
    </react_native_svg_1.Text>
  </react_native_svg_1.default>);
exports.SvgWithText = SvgWithText;
//# sourceMappingURL=sample.js.map