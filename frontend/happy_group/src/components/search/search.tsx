import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css"
import movieAPI from "@/app/api/movieAPI";
import { fbIcon,searchIcon, twitterIcon, instaIcon, logoIcon, logoutIcon } from '@/assets/svgs'
import {movie_img} from '@/assets/imgs'
import Link from "next/link";
export default function SearchComp() {
      const [searchInput, setSearchInput]=useState("");
      const [movies, setMovies]=useState([])
      const [isHoverBar, setIsHoverBar]=useState(false)
      const [isHoverList, setIsHoverList]=useState(false)
      const HandleSearch = function (e: { target: { value: string }; }) {
        const fetchSearchMovie= async(query: string) => {
          const res = await movieAPI.searchMovie(query);
          setMovies(res.data.movies);
        }
        setSearchInput(e.target.value);
  
        fetchSearchMovie(searchInput);
      }
      useEffect(()=>{
      })
     
    return (
      <div className={`${styles.searchbar}`} onMouseEnter={()=>setIsHoverBar(true)} onMouseLeave={()=> {setIsHoverBar(false)}} >
        <div className={styles.searchbar_header}>
          <Image src ={searchIcon} className={styles.searchIcon} alt=''></Image>
          <input className={styles.input} id="search_input" onChange={(e)=>HandleSearch(e)} placeholder="Search here . . ."></input>
        </div>
        {isHoverBar||isHoverList?(
          <ul className={styles.search_list_isHover}  onMouseOver={()=>setIsHoverList(true)} onMouseLeave={()=> {setIsHoverList(false)}}>
            {movies.map((movie:any)=> {
                return(
                  <div className={styles.search_item} key={movie} >
                    <Image className={styles.img} src={movie.image} width={25} height={25} alt=""/>
                    {movie.title}
                  </div>
                )
                })
              } 
            </ul>
        ):(
          <ul className={styles.search_list}  onMouseEnter={()=>setIsHoverList(true)} onMouseLeave={()=> {setIsHoverList(false)}}>
            {movies.map((movie:any)=> {
              return(
                <div className={styles.search_item} key={movie} >
                  <Image className={styles.img} src={movie.image} width={25} height={25} alt=""/>
                  {movie.title}
                </div>
              )
              })
            } 
           </ul>
        )}
      </div>
    );
}