import React from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from '../components/Layout/Page'

import Header from '../components/Layout/Navigation'

const StyledPage = styled.div<{ $removePadding: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: calc(100vh - 10px);
  background: url('/images/SFL_Background.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
    background: url('/images/SFL_Background.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
    background: url('/images/SFL_Background.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    background: url('/images/SFL_Background.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { removePadding?: boolean; hideFooterOnDesktop?: boolean }
> = ({ children, removePadding = false, ...props }) => {
  return (
    <>
      <PageMeta />
      <Header />
      <StyledPage $removePadding={removePadding} {...props}>
        {children}
        <Flex flexGrow={1} />
      </StyledPage>
    </>
  )
}

export default Page
