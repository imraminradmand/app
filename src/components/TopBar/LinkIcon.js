import React from 'react'
import styled from 'styled-components'

import icon from '../../images/icon.svg'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

const Link = styled(RouterLink)`
  display: none;

  align-items: center;
  justify-content: center;

  height: inherit;
  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  ${media.tablet`
    display: flex;
  `};

  ${media.desktop`
    display: flex;
  `};

  ${media.widescreen`
    display: none;
  `};
`

const Icon = styled.img`
  height: 2rem;
`

const LinkIcon = () => (
  <Link to="/">
    <Icon src={icon} alt="AXS Map icon" />
  </Link>
)

export default LinkIcon
