import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
padding: 4em;
background: black;
display: flex;
`;

const experienceHardCodedData = {
  city: 'Mexico City',
  state: null,
  country: 'Mexico',
  category: 'Arts and Culture',
  activity: 'History'
}

function InfoAboveMediaDisplay (props) {
  // const [experienceId, setExperienceId] = useState(experienceHardCodedData);

  // useEffect to perform API call to get data
  // useEffect(() => {

  // });



  return (
    <div>
      <Wrapper>
        <ul className="listCityAndActivity">
          <li className="listItem">
            <a>
              <span className="city-country">{props.experience.city}, {props.experience.country}</span>
            </a>
          </li>
          <li className="listItem">
            <span className="slash"> / </span>
          </li>
          <li className="listItem">
            <a>
              <span className="category">{props.experience.category}</span>
            </a>
          </li>
          <li className="listItem">
            <span className="slash"> / </span>
          </li>
          <li className="listItem">
            <a>
              <span className="activity">{props.experience.activity}</span>
            </a>
          </li>
        </ul>
      </Wrapper>
    </div>
  )

}


export default InfoAboveMediaDisplay;

