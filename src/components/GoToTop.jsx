// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { FaArrowUp } from "react-icons/fa";

// const GoToTop = ({ hide }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   const goToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const listenToScroll = () => {
//     const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//     const heightToHide = 20;
//     setIsVisible(winScroll > heightToHide);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", listenToScroll);
//     return () => window.removeEventListener("scroll", listenToScroll);
//   }, []);

//   if (hide) return null; // ✅ hide button when chat is open

//   return (
//     <Wrapper>
//       <div className={`top-btn ${isVisible ? "visible" : ""}`} onClick={goToTop}>
//         <FaArrowUp className="top-btn-icon" />
//       </div>
//     </Wrapper>
//   );
// };


// const Wrapper = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;

//   .top-btn {
//     font-size: 1.5rem;
//     width: 3rem;
//     height: 3rem;
//     color: #fff;
//     background-color: ${({ theme }) => theme.colors.btn};
//     box-shadow: ${({ theme }) => theme.colors.shadow};
//     border-radius: 50%;
//     position: fixed;
//     bottom: 5rem;
//     right: -3rem; /* Start position outside the viewport */
//     z-index: 999;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     transition: right 0.3s ease; /* Smooth transition for positioning */

//     &--icon {
//       animation: gototop 1.2s linear infinite alternate-reverse;
//     }

//     @keyframes gototop {
//       0% {
//         transform: translateY(-0.5rem);
//       }
//       100% {
//         transform: translateY(0.5rem);
//       }
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .top-btn {
//       right: 1rem; /* Adjust position for mobile view */
//       left: auto;
//     }
//   }

//   /* Show the button when visible */
//   .top-btn.visible {
//     right: 5rem; /* Position button within viewport */
//   }
// `;

// export default GoToTop;
