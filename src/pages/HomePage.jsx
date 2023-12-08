import React, { useState, useRef } from 'react'
import { Buy } from '../components/HomePage/Buy'
import { CardProduct } from '../components/HomePage/CardProduct'
import { NavBar } from '../components/HomePage/NavBar'
import { Welcome } from '../components/HomePage/Welcome'


export const HomePage = () => {


  return (
    <>
      <NavBar></NavBar>
      <Welcome></Welcome>
      <Buy></Buy>
    </>
  )
}
