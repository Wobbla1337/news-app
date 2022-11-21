import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import NewsCardComponent from './NewsCard';
import './News.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormComponent from '../Body/Form';
import { getEverything } from '../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setTotalResults } from '../Services/stateService';

function NewsGroupComponent() {
  const [show, setShow] = useState(false);
  const [articles, setArticles] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const searchParams = useSelector((state) => state.searchParams);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await getEverything(searchParams);
        const responseData = await response.json();
        if (responseData.status === 'error') {
          throw responseData;
        }
        setArticles(responseData.articles);
        dispatch(setTotalResults(responseData.totalResults))
      }
      catch (error) {
        dispatch(setErrorMessage(error.message));
        
      }

    })();
  }, [searchParams, dispatch]);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} className="mb-3">
        Launch
      </Button>
      <Row xs={1} md={2} lg={3} className="g-2">
        {articles.map((article, idx) => (
          <Col key={idx}>
            <NewsCardComponent article={article} />
          </Col>
        ))}
      </Row>
      <FormComponent
        show={show}
        handleClose={handleClose}
        setArticles={setArticles}
        searchProps={searchParams} />
    </>
  );
}

export default NewsGroupComponent;