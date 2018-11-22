import React from 'react';
import classes from './Footer.module.css';

function Footer() {
  return (
    <div className={classes.Footer}>
      <div className={classes.Content}>
        <p>
          Trường Đại học Công Nghệ - ĐHQGHN<br />
          Bài tập lớn phát triển ứng dụng Web
        </p>
      </div>
    </div>
  );
};

export default Footer;