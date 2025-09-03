import type { JSX } from 'react';

export const LoadingIcon = (): JSX.Element => (
  <svg
    height={200}
    width={200}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 200 200'
  >
    <circle
      fill='none'
      strokeOpacity='1'
      stroke='#023347'
      strokeWidth='.5'
      cx='100'
      cy='100'
      r='0'
    >
      <animate
        attributeName='r'
        calcMode='spline'
        dur='2'
        values='1;80'
        keyTimes='0;1'
        keySplines='0 .2 .5 1'
        repeatCount='indefinite'
      ></animate>
      <animate
        attributeName='stroke-width'
        calcMode='spline'
        dur='2'
        values='0;25'
        keyTimes='0;1'
        keySplines='0 .2 .5 1'
        repeatCount='indefinite'
      ></animate>
      <animate
        attributeName='stroke-opacity'
        calcMode='spline'
        dur='2'
        values='1;0'
        keyTimes='0;1'
        keySplines='0 .2 .5 1'
        repeatCount='indefinite'
      ></animate>
    </circle>
  </svg>
);

export const CloseIcon = (): JSX.Element => (
  <svg
    width='49'
    height='49'
    viewBox='0 0 49 49'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='24.5' cy='24.5' r='21.5' fill='#023347' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.523 12.523C13.2204 11.8257 14.351 11.8257 15.0484 12.523L24.5 21.9747L33.9516 12.523C34.649 11.8257 35.7797 11.8257 36.477 12.523C37.1743 13.2204 37.1743 14.351 36.477 15.0484L27.0254 24.5L36.477 33.9516C37.1743 34.649 37.1743 35.7797 36.477 36.477C35.7797 37.1743 34.649 37.1743 33.9516 36.477L24.5 27.0254L15.0484 36.477C14.351 37.1743 13.2204 37.1743 12.523 36.477C11.8257 35.7797 11.8257 34.649 12.523 33.9516L21.9747 24.5L12.523 15.0484C11.8257 14.351 11.8257 13.2204 12.523 12.523Z'
      fill='#F7FCFE'
    />
  </svg>
);

export const MenuIcon = (): JSX.Element => (
  <svg
    width='43'
    height='43'
    viewBox='0 0 43 43'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='21.5' cy='21.5' r='21.5' fill='#023347' />
    <line x1='8' y1='14.5' x2='35' y2='14.5' stroke='#F7FCFE' strokeWidth='3' />
    <line x1='8' y1='20.5' x2='35' y2='20.5' stroke='#F7FCFE' strokeWidth='3' />
    <line x1='8' y1='26.5' x2='35' y2='26.5' stroke='#F7FCFE' strokeWidth='3' />
  </svg>
);
