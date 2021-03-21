import React, { useState, useEffect } from 'react';
// import React from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './ProfileSection.module.css';
import { Link } from 'react-router-dom';
import MyProfile from './MyProfile/MyProfile';
import MyLetters from './MyLetters/MyLetters';
import LettersHistory from './LettersHistory/LettersHistory';
import Subscription from './Subscription/Subscription';
import ChangePassword from './ChangePassword/ChangePassword';
import Logout from './Logout/Logout';

const ProfileSection = () => {
  const [selectedMenu, selectMenu] = useState('My Profile');
  const [selectedComponent, selectComponent] = useState(<MyProfile />);
  const handleClick = (e) => {
    const item = e.target.innerText;
    console.log('On click', e.target.innerText);
    selectMenu(item);

    switch (item) {
      case 'My Profile':
        selectComponent(<MyProfile />);
        // console.log(dynamicComponent);
        break;
      case 'My Letters':
        selectComponent(<MyLetters />);
        // console.log(dynamicComponent);
        break;
      case 'Letters History':
        selectComponent(<LettersHistory />);
        // console.log(dynamicComponent);
        break;
      case 'Subscription':
        selectComponent(<Subscription />);
        // console.log(dynamicComponent);
        break;
      case 'Change Password':
        selectComponent(<ChangePassword />);
        // console.log(dynamicComponent);
        break;
      case 'Logout':
        selectComponent(<Logout />);
        // console.log(dynamicComponent);
        break;
    }
  };

  useEffect(() => {}, [selectedComponent]);

  const menu_items = [
    'My Profile',
    'My Letters',
    'Letters History',
    'Subscription',
    'Change Password',
    'Logout',
  ];

  let menuItems = menu_items.map((item, index) => {
    return (
      <li
        id={index}
        className={
          `${classes.menu_item} ` +
          (selectedMenu === item ? `${classes.active}` : '')
        }
      >
        <div onClick={(e) => handleClick(e)}>{item}</div>
      </li>
    );
  });

  let dynamicComponent = (
    <div className={classes.selected_menu}>
      {selectedMenu === 'My Profile' && <MyProfile />}
      {selectedMenu === 'My Letters' && <MyLetters />}
      {selectedMenu === 'Letters History' && <LettersHistory />}
      {selectedMenu === 'Subscription' && <Subscription />}
      {selectedMenu === 'Change Password' && <ChangePassword />}
      {selectedMenu === 'Logout' && <Logout />}
    </div>
  );

  return (
    <div>
      <main>
        <section className="blog-area pt-120 pb-80">
          <div className={`container ${classes.p_section}`}>
            <div className="row">
              <div className={classes.menu_container}>
                <div className="widget mb-40 mt-30">
                  <div className="widget-title-box mb-30">
                    <span className="animate-border"></span>
                    <h3 className="widget-title">Welcome User!</h3>
                  </div>
                  <ul className={`cat ${classes.menu_list}`}>
                    {/* <li
                      className={`active ${classes.menu_item}`}
                      onClick={(e) => handleClick(e)}
                    >
                      <div>My Profile </div>
                    </li>
                    <li>
                      <div>My Letters </div>
                    </li>
                    <li>
                      <div>Letters History</div>
                    </li>
                    <li>
                      <div>Subscription </div>
                    </li>
                    <li>
                      <div>Change Password </div>
                    </li>
                    <li>
                      <div>Logout </div>
                    </li> */}
                    {menuItems}
                  </ul>
                </div>
              </div>{' '}
              {dynamicComponent}
            </div>
          </div>
        </section>
      </main>
      {/* <!-- footer-area-start -->
<footer>
<div class="footer-area grey-bg" style="padding-top:75px;">
<div class="footer-bottom-area">
<div class="container">
<div class="footer-bg-bottom">
<div class="row">
<div class="col-xl-4 col-lg-4 col-md-4">
<div class="copyright">
<p style="color:white;"><i class="far fa-copyright"></i> Copyright&nbsp;2020&nbsp;Xcel Credit One.
</p>
</div>
</div>
<div class="col-xl-4 col-lg-4 col-md-4" style="text-align:center;">
<div class="footer-icon" style="margin-top:0px;">
<a href="#" style="color:white;border:none;"> <img src="social/big_img/fbicon237.png" style="width:100%;margin-top:-7px;"/></a><!--<i class="fab fa-facebook-f"></i></a>-->
<a href="#" style="color:white;border:none;"> <img src="social/big_img/Instagram_icon749.png" style="width:100%;margin-top:-7px;"/></a><!--<i class="fab fa-instagram"></i></a>-->
</div>
</div>
<div class="col-xl-4 col-lg-4 col-md-4">
<div class="footer-bottem-text text-md-right">
<p style="color:white;"><a href="terms-and-conditions/" style="color:white;">Terms & Conditions</a> | <a href="privacy-policy/" style="color:white;">Privacy Policy</a></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</footer>
<!-- footer-area-end --> */}

      {/* // <!-- JS here -->
// <script src="assets/js/vendor/jquery-1.12.4.min.js"></script>
// <script src="assets/js/popper.min.js"></script>
// <script src="assets/js/bootstrap.min.js"></script>
// <script src="assets/js/owl.carousel.min.js"></script>
// <script src="assets/js/isotope.pkgd.min.js"></script>
// <script src="assets/js/slick.min.js"></script>
// <script src="assets/js/jquery.meanmenu.min.js"></script>
// <script src="assets/js/ajax-form.js"></script>
// <script src="assets/js/wow.min.js"></script>
// <script src="assets/js/jquery.easypiechart.min.js"></script>
// <script src="assets/js/jquery.scrollUp.min.js"></script>
// <script src="assets/js/imagesloaded.pkgd.min.js"></script>
// <script src="assets/js/waypoints.min.js"></script>
// <script src="assets/js/jquery.counterup.min.js"></script>
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCo_pcAdFNbTDCAvMwAD19oRTuEmb9M50c"></script>
// <script src="assets/js/jquery.magnific-popup.min.js"></script>
// <script src="assets/js/plugins.js"></script>
// <script src="assets/js/main.js"></script>

// <script type="text/javascript" language="javascript"> 
// // $(document).ready(function () {
// // //Disable cut copy paste
// // $('body').bind('cut copy paste', function (e) {
// // e.preventDefault();
// // });
// // //Disable mouse right click
// // $("body").on("contextmenu",function(e){
// // return false;
// // });
// // });
// // $(document).keydown(function (event) {
// // if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74) || (event.ctrlKey && event.keyCode == 85)) {
// // return false;
// // }
// // });
// </script>*/}
      {/* </body> */}
      {/*
// </html><script>
// $("#profileForm").on("submit",function(event){
// event.preventDefault();
// $.ajax({
// url:"userInteraction.php?task=updateProfile",
// method:"POST",
// data:$("#profileForm").serialize(),
// beforeSend:function()
// {
// $("#lblMsg").html("Please wait");
// },
// success:function(data){
// if(data == 1)
// {
// $("#lblMsg").html("Saving Details");
// setTimeout(() => {
// window.open("my-profile/","_SELF");
// }, 500);
// }
// else
// {
// $("#lblMsg").html(data);
// }
// },
// error:function(data){
// $("#lblMsg").html("Something went wrong!");
// }
// });
// });
// </script>
// <script>
// $("#profileFormMobile").on("submit",function(event){
// event.preventDefault();
// $.ajax({
// url:"userInteraction.php?task=updateProfile",
// method:"POST",
// data:$("#profileFormMobile").serialize(),
// beforeSend:function()
// {
// $("#lblMsgMob").html("Please wait");
// },
// success:function(data){
// if(data == 1)
// {
// $("#lblMsgMob").html("Saving Details");
// setTimeout(() => {
// window.open("my-profile/","_SELF");
// }, 500);
// }
// else
// {
// $("#lblMsgMob").html(data);
// }
// },
// error:function(data){
// $("#lblMsgMob").html("Something went wrong!");
// }
// });
// });
// </script>*/}
    </div>
  );
};

export default ProfileSection;
