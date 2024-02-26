import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'on-sale' ?
              <SaleFlag>Sale</SaleFlag> :
              variant === 'new-release' ?
              <NewFlag>Just Released!</NewFlag> : null
          }
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {
            variant === 'on-sale' ?
                <PriceCrossed>{formatPrice(price)}</PriceCrossed> :
                <Price>{formatPrice(price)}</Price>
          }
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  color: ${COLORS.white};
  font-weight: 700;
  padding: 7px 9px 9px 11px;
    border-radius: 2px;
  position: absolute;
  right: -4px;
  top: 12px;
  font-size: ${14/16}rem;
`

const SaleFlag = styled(Flag)`
  background: ${COLORS.primary};
  `

const NewFlag = styled(Flag)`
  background: ${COLORS.secondary};
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 250px;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
width: 100%;
  border-radius: 8px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const PriceCrossed = styled.span`
  color: ${COLORS.gray[500]};
  text-decoration: line-through;
`;


export default ShoeCard;
