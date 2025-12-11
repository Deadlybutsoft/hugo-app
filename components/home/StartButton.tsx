"use client";
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { spaceGrotesk } from "@/lib/fonts";
import { ArrowUpRight } from 'lucide-react';

const StartButton = () => {
  return (
    <Link href="/chat">
      <StyledWrapper>
        <div className="button-container">
          <button className="c-button c-button--gooey group">
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
            <span className={spaceGrotesk.className} style={{ fontSize: '1.1em', fontWeight: 600 }}>Start Registering</span>
            <div className="c-button__blobs">
              <div />
              <div />
              <div />
            </div>
          </button>

          <div className="icon-circle">
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'block', height: 0, width: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </StyledWrapper>
    </Link>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
  }

  .c-button {
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    padding: 0.8em 2em;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    z-index: 1;
    background: transparent;
  }

  .c-button--gooey {
    color: #ffffff;
    text-transform: none;
    letter-spacing: 1px;
    border: 1px solid #D0FE17; /* Green border */
    border-radius: 40px;
    position: relative;
    transition: all 700ms ease;
  }

  .c-button--gooey .c-button__blobs {
    height: 100%;
    filter: url(#goo);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: -3px;
    right: -1px;
    z-index: -1;
    border-radius: 40px;
  }

  .c-button--gooey .c-button__blobs div {
    background-color: #ffffff;
    width: 34%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transform: scale(1.4) translateY(125%) translateZ(0);
    transition: all 700ms ease;
  }

  .c-button--gooey .c-button__blobs div:nth-child(1) {
    left: -5%;
  }

  .c-button--gooey .c-button__blobs div:nth-child(2) {
    left: 30%;
    transition-delay: 60ms;
  }

  .c-button--gooey .c-button__blobs div:nth-child(3) {
    left: 66%;
    transition-delay: 25ms;
  }

  /* Hover effects triggered by container hover */
  .button-container:hover .c-button--gooey {
    color: #000;
  }

  .button-container:hover .c-button__blobs div {
    transform: scale(1.4) translateY(0) translateZ(0);
  }

  .icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: #D0FE17;
    border-radius: 50%;
    color: #000000;
    transition: all 0.5s ease;
    border: none;
  }

  .button-container:hover .icon-circle {
     transform: rotate(45deg);
  }
`;

export default StartButton;
