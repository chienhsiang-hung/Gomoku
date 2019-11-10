import styled from "styled-components";
import { Player } from "@gobang/utils/GameBoard/types";

type GameProps = {
  rows: number;
  columns: number;
};

type ButtonProps = {
  turn: Player;
};

export const GameContainer = styled.div<GameProps>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, minmax(1rem, 1fr));
  grid-template-columns: repeat(${props => props.columns}, minmax(1rem, 1fr));
`;

export const CellContainer = styled.div<GameProps>`
  position: relative;
  z-index: 0;

  &:before {
    content: "";
    position: absolute;
    border-bottom: 1px black solid;
    height: 50%;
    width: 100%;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    border-right: 1px black solid;
    height: 100%;
    width: 50%;
    z-index: -1;
  }

  /* first row of the grid */
  &:nth-child(-n + ${props => props.columns}) {
    &:after {
      height: 50%;
      bottom: 0;
    }
  }

  /* last column of the grid */
  &:nth-child(${props => props.rows}n) {
    &:before {
      width: 50%;
    }
  }

  /* first column of the grid */
  &:nth-child(${props => props.rows}n + 1) {
    &:before {
      width: 50%;
      left: 50%;
    }
  }

  /* last row of the grid */
  &:nth-child(n + ${props => props.rows * (props.columns - 1) + 1}) {
    &:after {
      height: 50%;
      top: 0;
    }
  }
`;

export const Button = styled.button<ButtonProps>`
  width: 75%;
  height: 75%;
  background: transparent;
  opacity: 0.6;
  border: none;
  position: absolute;
  cursor: pointer;
  transform: translate(15%, 15%);
  border-radius: 100%;
  z-index: 1;

  &.btn-free {
    &:hover {
      background: black;
      background: ${props =>
        props.turn === Player.WHITE
          ? "radial-gradient(circle at 30% 30%, white, #868484)"
          : "radial-gradient(circle at 30% 30%, #5f5f5f, #000)"};
    }

    &:active {
      opacity: 1;
      background: black;
      background: ${props =>
        props.turn === Player.WHITE
          ? "radial-gradient(circle at 30% 30%, white, #868484)"
          : "radial-gradient(circle at 30% 30%, #5f5f5f, #000)"};
    }
  }

  &:focus {
    outline: none;
  }

  &.btn-selected-white {
    opacity: 1;
    background: radial-gradient(circle at 30% 30%, white, #868484);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
  }

  &.btn-selected-black {
    opacity: 1;
    background: radial-gradient(circle at 30% 30%, #5f5f5f, #000);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
  }

  &.btn-winner-cell {
    box-shadow: 0 0 5px 3px #ff003b;
  }

  &:disabled:hover {
    cursor: not-allowed;
  }

  @-webkit-keyframes pulse {
    0% {
      border-color: #eff1f2;
      background: transparent;
      -webkit-transform: scale(0.1) translateZ(0px);
      transform: scale(0.1) translateZ(0px);
    }
    to {
      border-color: transparent;
      -webkit-transform: scale(1.5) translateZ(0px);
      transform: scale(1.5) translateZ(0px);
    }
  }

  @keyframes pulse {
    0% {
      border-color: rgba(18, 255, 235, 0.8);
      background: transparent;
      transform: scale(0.9);
    }
    to {
      border-color: transparent;
      border-width: 6px;
      transform: scale(1.9);
    }
  }

  &.btn-last-played:after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 100%;
    z-index: -1;
    border: 2px solid rgba(239, 241, 242, 0);
    animation: pulse 0.9s 0.4s infinite cubic-bezier(0.075, 0.82, 0.165, 1);
    backface-visibility: hidden;
  }
`;
