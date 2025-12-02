# React Native SVG Preview

Preview your React Native SVG components directly in VS Code without running the app.

![Preview Demo](images/demo.gif)

## Features

- **Real-time Preview**: See your SVG changes instantly as you type
- **Zoom Control**: Adjust zoom from 25% to 400%
- **Background Options**: White, black, gray, checkerboard, or custom color
- **Full Component Support**: Circle, Rect, Path, G, LinearGradient, Text, and more

## Supported Components

| Component | Status |
|-----------|--------|
| Svg | ✅ |
| Circle | ✅ |
| Ellipse | ✅ |
| Rect | ✅ |
| Path | ✅ |
| Line | ✅ |
| Polygon | ✅ |
| Polyline | ✅ |
| G (Group) | ✅ |
| Text | ✅ |
| TSpan | ✅ |
| Defs | ✅ |
| LinearGradient | ✅ |
| RadialGradient | ✅ |
| Stop | ✅ |
| ClipPath | ✅ |
| Mask | ✅ |
| Pattern | ✅ |
| Use | ✅ |
| Symbol | ✅ |

## Usage

1. Open a `.tsx`, `.jsx`, `.ts`, or `.js` file containing React Native SVG code
2. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run **"React Native SVG: Show Preview"**

The preview panel will open beside your editor and update automatically as you edit.

## Example

```tsx
import Svg, { Circle, Rect } from 'react-native-svg';

export const MyIcon = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100">
    <Rect x={10} y={10} width={80} height={80} fill="#4CAF50" rx={10} />
    <Circle cx={50} cy={50} r={30} fill="#fff" />
  </Svg>
);
```

## Requirements

- VS Code 1.85.0 or higher
- No additional dependencies required

## Known Limitations

- Dynamic values (props, state, computed values) are shown as CSS variables
- Some advanced features like animations are not supported in preview
- Complex expressions in attributes may not be evaluated

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
