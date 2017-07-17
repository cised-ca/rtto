'use strict';

import React from 'react';

import { translate } from 'react-i18next';

import Back from './BackComponent';

class GetInvolvedPageComponent extends React.Component {
  render() {

    return (
      <div className="page placeholderpage-component container">
        <Back />

        <h1>Get involved</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar leo ligula, in sagittis felis rhoncus et. Aliquam erat
          volutpat. In pharetra sit amet quam id maximus. Suspendisse vel porta
          nisi.
        </p>

        <p>
          Ut neque ipsum, interdum ut sapien commodo, feugiat facilisis augue.
          Nam augue odio, eleifend sed est eu, accumsan suscipit tortor.
          Praesent convallis ut velit in vehicula. Nunc enim odio, pulvinar id
          turpis ac, condimentum feugiat purus. Donec nisl massa, consequat sed
          gravida et, vestibulum ac dui.
        </p>

        <p>
          In ac auctor tortor. Nunc convallis nisi in ex venenatis, sit amet
          suscipit nunc dignissim. Suspendisse in faucibus dui, vitae eleifend
          leo. Mauris efficitur odio lorem, at sodales ipsum porta at. Mauris
          hendrerit sed massa non consectetur.
        </p>
      </div>
    );
  }
}

GetInvolvedPageComponent.displayName = 'GetInvolvedPageComponent';

export { GetInvolvedPageComponent };
export default translate('placeholder')(GetInvolvedPageComponent);
