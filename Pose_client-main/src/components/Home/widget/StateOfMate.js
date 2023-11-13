import React, {useEffect, useState} from 'react';
import {ThemeColor, Scroll, LinkBox, Loading, DoughnutBox} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {MATE, GET_FOLLOWERS_EXERCISES_STATUS} from "../../../services/api";
import {functions} from "../../../utils/Functions";
import axios from "axios";
import {backgroundOptions, frontOption} from "../../../config/doughnutChart";



const SquareBox = ({data}) => {

    const sliceData = data => data.length <= 4 ? data : data.slice(0, 4)
    const isDataExist = data => data ? sliceData(data) : null
    const makeChartData = data => {
        let label = [], datasets = [], backgroundDatasets = []
        const chartColor = ['hotpink', 'blue', 'green', 'yellow']
        const backgroundColor = [
            'rgba(204, 51, 128, 0.2)',
            'rgba(0, 0, 153, 0.2)',
            'rgba(0, 64, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)'
        ]
        isDataExist(data)?.map((data, index) => {
            label.push(data.label)
            const percent = data.attain / data.number * 100
            const dataset = {
                data: [percent, 100 - percent],
                backgroundColor: [chartColor[index], 'rgba(0, 0, 0, 0)']
            }
            const backgroundDataset = {
                data: [100, 0],
                backgroundColor: [backgroundColor[index], 'rgba(0, 0, 0, 0)']
            }
            datasets.push(dataset)
            backgroundDatasets.push(backgroundDataset)
        })
        const chartData = {
            labels: label,
            datasets: datasets
        }
        const backgroundData = {
            labels: label,
            datasets: backgroundDatasets
        }
        return {chartData, backgroundData}
    }

    return (
        <DoughnutBox>
            {data ?
                <>
                    <span className={'back'}>
                        {<Doughnut data={makeChartData(data).backgroundData} options={backgroundOptions}/>}
                    </span>
                    <span className={'front'}>
                        {<Doughnut data={makeChartData(data).chartData} options={frontOption}/>}
                    </span>
                </>
                :
                <p style={{fontSize: '15px'}}>정보가 없습니다</p>
            }
        </DoughnutBox>
    );
};

const Carousel = ({componentToRender, data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                        <span style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '-15px',
                            fontWeight: 'bold',
                            fontSize: '13px',
                        }}
                        >{data.name}
                        </span>
                    {React.cloneElement(componentToRender, {data: data?.goal?.goals})}
                </div>
            ))}
        </Scroll>
    )
}

const UserMate = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState();


    const getFollowersExercisesStatus = async () => {
        try {
            const headers = await functions.getJWT()
            const res = await axios.get(GET_FOLLOWERS_EXERCISES_STATUS, {headers: headers})
            setUserData(res.data.followingUsersExerciseStatus)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getFollowersExercisesStatus().then()
    }, [])
    // console.log(userData)
    return (
        <div style={{width: '390px'}}>

            <div style={{marginLeft: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <p>
                    팔로잉한 유저들의 운동 현황
                </p>
                <Link to={'/mate'} style={{textDecoration: 'none', color: 'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight: '20px', marginTop: '15px'}}/>
                </Link>
            </div>
            {isLoading ?
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Loading/>
                </div> :
                <Carousel data={userData} componentToRender={<SquareBox/>}/>
            }
        </div>
    )
}

function StateOfMate(props) {
    const following = useSelector((state) => state.following)


    return (
        <div style={{maxWidth: '390px'}}>
            {following ?
                <UserMate/>
                :
                <LinkBox url={MATE} title={'메이트가 없습니다!'} content={'메이트 찾으러 가기'}/>
            }

        </div>
    );
}

export default StateOfMate;