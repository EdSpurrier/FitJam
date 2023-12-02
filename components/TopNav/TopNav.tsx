'use client'

import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { GiOctopus } from "react-icons/gi";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { GrLinkedin } from "react-icons/gr";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
} from "@/components/icons";

import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './TopNav.module.css'
import { TopNavProps } from './TopNav.types'

const TopNav = ({
  children,
  className,
  style,
}: TopNavProps) => {

  const setStyles = (): CSSProperties => {
    return {
      ...style,
      /* Add Additional CSS Styles Here... */
    }
  }

  return (

    <div
      style={setStyles()}
      className={clsx(
        styles.root,
        className,
        'flex flex-row justify-between items-center w-full h-12 px-4 py-2 bg-background-500'
      )}>
      <NextLink className="flex items-center justify-start gap-1" href="/">
        <GiOctopus className={clsx('mr-2')} size={25} />
      </NextLink>


      <ul className="justify-start hidden gap-4 ml-2 lg:flex">
        {siteConfig.navItems.map((item) => (
          <div key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </div>
        ))}
      </ul>

      <div
        className="justify-end hidden sm:flex basis-1/5 sm:basis-full"
      >
        <div className="hidden gap-2 sm:flex">
          <Link isExternal href={siteConfig.links.linkedin} aria-label="LinkedIn">
            <GrLinkedin className={clsx('text-default-500')} />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </div>
      </div>

      <div className="justify-end pl-4 sm:hidden basis-1">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </div>

    </div>
  )
}


export default TopNav