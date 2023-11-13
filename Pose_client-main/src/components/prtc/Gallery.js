import React from 'react';
import styled from 'styled-components';
const Scroll = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;

  /* PC 버전 */
  @media (min-width: 768px) {
    overflow-y: hidden; /* 세로 스크롤 숨김 */
  }

  /* 모바일 버전 */
  @media (max-width: 767px) {
    overflow: hidden; /* 가로 및 세로 스크롤 숨김 */
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
`
function Gallery({componentToRender}) {
    const boxes = Array.from(Array(7).keys());
    return (
        <Scroll>
                {boxes.map((number) => (
                    <div key={number}>{componentToRender}</div>
                ))}
        </Scroll>
    );
}
export default Gallery;

