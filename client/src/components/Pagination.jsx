import React,{useEffect} from 'react';
import {Pagination,PaginationItem} from '@material-ui/lab';
import useStyles from './styles';
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../actions/posts"
const Paginate = ({page})=>{
    console.log("pagepage",page)
    const dispatch=useDispatch();
    const classes = useStyles();
     useEffect(() => {
   if(page)dispatch(getPosts(page));
  }, [dispatch,page]);
    return (
        <Pagination
        classes={{ui:classes.ui}}
        count={5}
        page={1}
        variant='outlined'
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${1}`}/>
        )}/>
    )
}

export default Paginate;