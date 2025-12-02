import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

// React Native SVG component to standard SVG element mapping
const RN_SVG_TO_SVG: Record<string, string> = {
  Svg: 'svg',
  Circle: 'circle',
  Ellipse: 'ellipse',
  G: 'g',
  Text: 'text',
  TSpan: 'tspan',
  TextPath: 'textPath',
  Path: 'path',
  Polygon: 'polygon',
  Polyline: 'polyline',
  Line: 'line',
  Rect: 'rect',
  Use: 'use',
  Image: 'image',
  Symbol: 'symbol',
  Defs: 'defs',
  LinearGradient: 'linearGradient',
  RadialGradient: 'radialGradient',
  Stop: 'stop',
  ClipPath: 'clipPath',
  Pattern: 'pattern',
  Mask: 'mask',
  Marker: 'marker',
  ForeignObject: 'foreignObject',
};

// React Native SVG prop to standard SVG attribute mapping
const RN_PROP_TO_SVG_ATTR: Record<string, string> = {
  fill: 'fill',
  stroke: 'stroke',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',
  clipPath: 'clip-path',
  opacity: 'opacity',
  x: 'x',
  y: 'y',
  x1: 'x1',
  y1: 'y1',
  x2: 'x2',
  y2: 'y2',
  cx: 'cx',
  cy: 'cy',
  r: 'r',
  rx: 'rx',
  ry: 'ry',
  d: 'd',
  points: 'points',
  width: 'width',
  height: 'height',
  viewBox: 'viewBox',
  preserveAspectRatio: 'preserveAspectRatio',
  transform: 'transform',
  origin: 'transform-origin',
  href: 'href',
  xlinkHref: 'xlink:href',
  id: 'id',
  gradientUnits: 'gradientUnits',
  gradientTransform: 'gradientTransform',
  spreadMethod: 'spreadMethod',
  offset: 'offset',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontStyle: 'font-style',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  dominantBaseline: 'dominant-baseline',
  alignmentBaseline: 'alignment-baseline',
  dx: 'dx',
  dy: 'dy',
  rotate: 'rotate',
  lengthAdjust: 'lengthAdjust',
  textLength: 'textLength',
  startOffset: 'startOffset',
  method: 'method',
  spacing: 'spacing',
  markerStart: 'marker-start',
  markerMid: 'marker-mid',
  markerEnd: 'marker-end',
  markerWidth: 'markerWidth',
  markerHeight: 'markerHeight',
  refX: 'refX',
  refY: 'refY',
  orient: 'orient',
  markerUnits: 'markerUnits',
  patternUnits: 'patternUnits',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  maskUnits: 'maskUnits',
  maskContentUnits: 'maskContentUnits',
};

interface SvgNode {
  type: string;
  attributes: Record<string, string>;
  children: (SvgNode | string)[];
}

interface ParseResult {
  svgNodes: SvgNode[];
  errors: string[];
}

export function parseReactNativeSvg(code: string): ParseResult {
  const errors: string[] = [];
  const svgNodes: SvgNode[] = [];

  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy'],
    });

    traverse(ast, {
      JSXElement(path) {
        const element = path.node;
        const openingElement = element.openingElement;

        // Check if this is a top-level SVG element
        if (t.isJSXIdentifier(openingElement.name)) {
          const componentName = openingElement.name.name;
          if (componentName === 'Svg' || RN_SVG_TO_SVG[componentName] === 'svg') {
            const svgNode = convertJsxToSvgNode(element);
            if (svgNode) {
              svgNodes.push(svgNode);
            }
            // Don't traverse children since we handle them recursively
            path.skip();
          }
        }
      },
    });
  } catch (e) {
    errors.push(`Parse error: ${e instanceof Error ? e.message : String(e)}`);
  }

  return { svgNodes, errors };
}

function convertJsxToSvgNode(element: t.JSXElement): SvgNode | null {
  const openingElement = element.openingElement;

  let tagName: string | null = null;

  if (t.isJSXIdentifier(openingElement.name)) {
    const componentName = openingElement.name.name;
    tagName = RN_SVG_TO_SVG[componentName];
    if (!tagName) {
      // Unknown component, try to use it as-is if it looks like SVG
      tagName = componentName.toLowerCase();
    }
  } else if (t.isJSXMemberExpression(openingElement.name)) {
    // Handle Svg.Circle, etc.
    if (t.isJSXIdentifier(openingElement.name.property)) {
      const propName = openingElement.name.property.name;
      tagName = RN_SVG_TO_SVG[propName];
    }
  }

  if (!tagName) {
    return null;
  }

  const attributes: Record<string, string> = {};

  // Process attributes
  for (const attr of openingElement.attributes) {
    if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
      const propName = attr.name.name;
      const svgAttrName = RN_PROP_TO_SVG_ATTR[propName] || propName;
      const value = extractAttributeValue(attr.value);
      if (value !== null) {
        attributes[svgAttrName] = value;
      }
    }
  }

  // Add default viewBox if not present for Svg element
  if (tagName === 'svg' && !attributes['viewBox']) {
    const width = attributes['width'] || '100';
    const height = attributes['height'] || '100';
    attributes['viewBox'] = `0 0 ${parseNumericValue(width)} ${parseNumericValue(height)}`;
  }

  // Add xmlns for svg element
  if (tagName === 'svg') {
    attributes['xmlns'] = 'http://www.w3.org/2000/svg';
  }

  // Process children
  const children: (SvgNode | string)[] = [];
  for (const child of element.children) {
    if (t.isJSXElement(child)) {
      const childNode = convertJsxToSvgNode(child);
      if (childNode) {
        children.push(childNode);
      }
    } else if (t.isJSXText(child)) {
      const text = child.value.trim();
      if (text) {
        children.push(text);
      }
    } else if (t.isJSXExpressionContainer(child)) {
      // Handle expressions like {children} or {"text"}
      if (t.isStringLiteral(child.expression)) {
        children.push(child.expression.value);
      } else if (t.isNumericLiteral(child.expression)) {
        children.push(String(child.expression.value));
      }
    }
  }

  return { type: tagName, attributes, children };
}

function extractAttributeValue(value: t.JSXAttribute['value']): string | null {
  if (!value) {
    return 'true'; // Boolean attribute
  }

  if (t.isStringLiteral(value)) {
    return value.value;
  }

  if (t.isJSXExpressionContainer(value)) {
    const expr = value.expression;

    if (t.isStringLiteral(expr)) {
      return expr.value;
    }

    if (t.isNumericLiteral(expr)) {
      return String(expr.value);
    }

    if (t.isTemplateLiteral(expr)) {
      // Simple template literal without expressions
      if (expr.expressions.length === 0 && expr.quasis.length === 1) {
        return expr.quasis[0].value.raw;
      }
    }

    if (t.isIdentifier(expr)) {
      // Variable reference - return placeholder
      return `var(--${expr.name})`;
    }

    if (t.isMemberExpression(expr)) {
      // Handle things like colors.primary
      return extractMemberExpression(expr);
    }

    if (t.isArrayExpression(expr)) {
      // Handle array values like strokeDasharray={[5, 10]}
      const values = expr.elements
        .filter((el): el is t.NumericLiteral | t.StringLiteral =>
          t.isNumericLiteral(el) || t.isStringLiteral(el)
        )
        .map(el => t.isNumericLiteral(el) ? String(el.value) : el.value);
      return values.join(' ');
    }
  }

  return null;
}

function extractMemberExpression(expr: t.MemberExpression): string {
  const parts: string[] = [];

  let current: t.Expression = expr;
  while (t.isMemberExpression(current)) {
    if (t.isIdentifier(current.property)) {
      parts.unshift(current.property.name);
    }
    current = current.object;
  }

  if (t.isIdentifier(current)) {
    parts.unshift(current.name);
  }

  return `var(--${parts.join('-')})`;
}

function parseNumericValue(value: string): number {
  const num = parseFloat(value);
  return isNaN(num) ? 100 : num;
}

export function svgNodeToString(node: SvgNode, indent: number = 0): string {
  const indentStr = '  '.repeat(indent);
  const attrs = Object.entries(node.attributes)
    .map(([key, value]) => `${key}="${escapeXml(value)}"`)
    .join(' ');

  const openTag = attrs ? `<${node.type} ${attrs}` : `<${node.type}`;

  if (node.children.length === 0) {
    return `${indentStr}${openTag}/>`;
  }

  const childrenStr = node.children
    .map(child => {
      if (typeof child === 'string') {
        return `${indentStr}  ${escapeXml(child)}`;
      }
      return svgNodeToString(child, indent + 1);
    })
    .join('\n');

  return `${indentStr}${openTag}>\n${childrenStr}\n${indentStr}</${node.type}>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function convertToSvgString(code: string): { svg: string; errors: string[] } {
  const { svgNodes, errors } = parseReactNativeSvg(code);

  if (svgNodes.length === 0) {
    return {
      svg: '',
      errors: errors.length > 0 ? errors : ['No React Native SVG components found'],
    };
  }

  const svgStrings = svgNodes.map(node => svgNodeToString(node));
  return {
    svg: svgStrings.join('\n\n'),
    errors,
  };
}
