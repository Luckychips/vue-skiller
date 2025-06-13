export type ButtonCssProps = {
  width?: string,
  height?: string,
  color?: string,
  backgroundColor?: string,
  padding?: string,
  borderRadius?: string,
  hoveredBackgroundColor?: string,
};

export const buttonDefaultCss = {
  width: '100%',
  height: 'auto',
  color: 'white',
  backgroundColor: '#42b983',
  padding: '0',
  borderRadius: '5px',
  hoveredBackgroundColor: '#369870',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
}