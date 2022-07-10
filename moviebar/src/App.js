
import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";
import MovieInfoComponent from "./Components/MovieInfoComponent";
import Login from './Components/Login'
import SignUp from './Components/SignUp'

export const API_KEY = "2f88e19f";
function App() {

  const [searchQuery,updateSearchQuuery]=useState("");
  const [timeoutId,updateTimeoutId] = useState();
  const [movieList,updateMovieList] = useState([]);
  const [selectedMovie,onMovieSelect] = useState();
  
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${"2f88e19f"}`,
    );

    updateMovieList(response.data.Search);
    
  };

  const onTextChange=(event)=>{
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),100);
    updateTimeoutId(timeout);
    

  }
  return (
    <Container>
      <Header>
      
      <AppName>
      🎥 MOVIE BAR
      </AppName>
      <SearchBox>
      <SearchIcon src="search-512.webp" />
      <SearchInput placeholder="Search movie" value={searchQuery} onChange={onTextChange}></SearchInput>

      </SearchBox>
      {/* <LoginButton>Login</LoginButton>
      <SigninButton>Sign in</SigninButton> */}
      
      </Header>
      <Login />
      <SignUp />
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          ""
        )}
      </MovieListContainer>
    </Container>
  );
}


const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const MovieListContainer = styled.div`
display:flex;
flex-direction:row;
justify-content:space-evenly;
flex-wrap:wrap;
padding:30px;
`;

const SigninButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-right:60px;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const LoginButton=styled.button`
height:35px;
width:70px;
padding:5px;
margin-left:180px;
:hover {
  background-color: black;
		color: white;
		cursor: pointer;
	}
`;

const SearchInput=styled.input`
color: black;
font-size:16px;
font-weight:bold;

padding:10px;
margin-left: 15px;
width:100%;
`;

const SearchIcon=styled.img`
width:32px;
height:32px;
`;

const SearchBox=styled.div`
display:flex;
flex-direction:row;
padding:10px 10px;
background-color:white;
border-radius:6px;
margin-left:20px;
width:50%;
background-color:white;
align-items:center;
`;

const Container=styled.div`
display:flex;
flex-direction:column;
`;

const Header=styled.div`
display:flex;
flex-direction:row;
background-color:white;
color:black;
padding:10px;
font-size:25px;
font-weight:bold;
-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
justify-content:space-between;
align-items:center;
`;

const AppName=styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;


export default App;

