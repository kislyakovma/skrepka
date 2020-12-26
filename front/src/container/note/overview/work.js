import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { NoteCardWrap } from '../style';
import NoteCard from '../../../components/note/Card';
import { Cards } from '../../../components/cards/frame/cards-frame';

const Favorite = () => {
  const { noteData } = useSelector((state) => {
    return {
      noteData: state.Note.data,
    };
  });
  return (
    <Cards title="Work Lists">
      <NoteCardWrap>
        <Row gutter={24}>
          {noteData
            .filter((item) => item.label === 'work')
            .map((item) => {
              return (
                <Col xxl={8} xl={12} lg={8} sm={12} xs={24} key={item.key}>
                  <NoteCard data={item} />
                </Col>
              );
            })}
        </Row>
      </NoteCardWrap>
    </Cards>
  );
};

export default Favorite;
