import styled from 'styled-components';

let possibly_pixels = (x) =>
  x == null ? null : typeof x === 'number' ? `${x}px` : x;

/** @type {import("styled-components").StyledComponent<"div", any, { height?: number, width?: number }, never>} */
export let Whitespace = styled.div`
  min-height: ${(props) =>
    // @ts-ignore
    possibly_pixels(props.height) ?? 0};
  min-width: ${(props) => possibly_pixels(props.width) ?? 0};
`;
