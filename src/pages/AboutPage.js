import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      {/* 2-column layout on big screen */}
      <Wrapper className="page section section-center">
        {/* 1st column  */}
        <img src={aboutImg} alt="nice desk" />
        {/* 2nd column */}
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              alias laboriosam explicabo ipsam unde, laudantium culpa reiciendis
              error temporibus harum corrupti quisquam vero facere hic minus
              quae reprehenderit esse itaque cum. Cupiditate voluptates eum
              harum obcaecati hic ipsa corrupti culpa esse, repudiandae aliquam
              fugit et ab maxime doloribus officiis aliquid.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
