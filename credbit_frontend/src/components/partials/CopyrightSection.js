import React from "react";
import { Link } from "react-router-dom";

const CopyrightSection = () => (
  <div class="footer-bg-bottom">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-8">
        <div class="copyright">
          <p>
            <i class="far fa-copyright"></i> Copyright 2019 Zekio. All rights
            reserved.
          </p>
        </div>
      </div>

      <div class="col-xl-4 col-lg-4 col-md-4">
        <div class="footer-bottem-text text-md-right">
          <p>
            Design By <Link to="#">BDevs</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CopyrightSection;
