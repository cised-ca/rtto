'use strict';

import React from 'react';

import { Link } from 'react-router';
import LocationDisambiguation from './LocationDisambiguationComponent';
import Loading from './LoadingComponent';

import { translate } from 'react-i18next';

const POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z]/;

class SearchFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationDisambiguation: null,
      searchText: null,
      searchLocationText: null,
      moreOptionsExpanded: false
    };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps() {
    if (!this.state.locationDisambiguation) {
      this.reset();
    }
  }

  reset() {
    this.setState({
      locationDisambiguation: null,
      searchText: null,
      searchLocationText: null
    });
  }

  toggleMoreOptions(e) {
    e.preventDefault();
    this.setState({
      moreOptionsExpanded: !this.state.moreOptionsExpanded
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let searchLocationText = '';
    if (this.refs.searchLocationInput) {
      searchLocationText = this.refs.searchLocationInput.value;
    }
    this.setState({
      searchText: this.refs.searchTextInput.value,
      searchLocationText: searchLocationText
    }, this.handleSearch);
  }

  handleSearch() {
    if (!this.state.searchLocationText) {
      this.props.onSearch(this.state.searchText);
      return;
    }

    this.performLocationSearch();
  }

  handleLocationSelection(location) {
    this.setState({
      searchLocationText: location.placeName
    });
    this.props.onSearch(
      this.state.searchText,
      location.placeName,
      [location.longitude, location.latitude]
    );
  }

  handleNoLocationFound() {
    this.props.onSearch(
      this.state.searchText,
      this.state.searchLocationText
    );
  }

  isPostalCode(text) {
    return POSTAL_CODE_REGEX.exec(text);
  }

  performLocationSearch() {
    let locationText = this.state.searchLocationText;
    let url  = this.context.config.geo_api_root +
            '/api/placeNameSearch?placeName=' + locationText;
    if (this.isPostalCode(locationText)) {
      // strip to first 3 characters because Geonames dataset only contains
      // first half of canadian postal codes
      let postalCode = locationText.slice(0, 3).toUpperCase();
      url  = this.context.config.geo_api_root +
              '/api/postalCodeLookup?postalCode=' + postalCode;
    }

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusCode);
    })
    .then(results => {
      if (!Array.isArray(results)) {
        results = [results];
      }
      this.handleLocationQueryResponse(results);
    })
    .catch(err => {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }

  handleLocationQueryResponse(results) {
    let locationTextString = this.state.searchLocationText;
    if (results.length == 0) {
      this.handleNoLocationFound();
      return;
    }

    if (results.length == 1) {
      this.handleLocationSelection(results[0]);
      return;
    }

    // If the form's value exactly matches a place name, let's use that place
    // even if there may be other matches.
    // But need to look at brackets too, because there is
    // "Kingston" (from New Brunswick) vs "Kingston (Downtown)" (from Ontario)
    // and that is a case we would want to disambiguate on.
    // But if they search "Kingston (Downtown)" don't disambiguate.
    let exactPlaceMatch = [];
    if (locationTextString.indexOf('(') !== -1) {
      exactPlaceMatch = results.filter(location => {
        return location.placeName.toLowerCase().trim() === locationTextString.toLowerCase().trim();
      });
    } else {
      exactPlaceMatch = results.filter(location => {
        return location.placeName.split('(')[0].toLowerCase().trim() === locationTextString.toLowerCase().trim();
      });
    }
    if (exactPlaceMatch.length === 1) {
      this.handleLocationSelection(exactPlaceMatch[0]);
      return;
    }

    // Otherwise, we need to enter location disambiguation phase
    this.setState({locationDisambiguation: results});
  }

  buildMoreOptionsButton() {
    const { t } = this.props;
    let moreOptions = (
      <div className="search-more-options-container" >
        <a className="search-more-options-button" onClick={this.toggleMoreOptions.bind(this) }>
          + {t('searchForm:moreOptions')}
        </a>
      </div>
    );
    if (this.state.moreOptionsExpanded) {
      moreOptions = (
        <div className="search-more-options-container">
          <a className="search-more-options-button" onClick={this.toggleMoreOptions.bind(this) }>
            - {t('searchForm:lessOptions')}
          </a>
        </div>
      );
    }
    return moreOptions;
  }

  buildSearchForm(moreOptions) {
    const { t } = this.props;
    let searchText = '';
    if (this.props.searchText) {
      searchText = this.props.searchText;
    }

    let searchLocation = this.props.searchLocation || '';
    if (this.state.moreOptionsExpanded) {
      return (
        <div>
          <form className="search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>

            <input className="search-form__query"
              placeholder={t('searchForm:findSocialEnterprises')} type="search"
              ref="searchTextInput" defaultValue={searchText} />

              <div className="row">
                <div className="col-md-1"/>
                <div className="col-md-2">
                  <label className="search-form__location_label" htmlFor="near">
                    {t('searchForm:near')}
                  </label>
                </div>
                <div className="col-md-9">
                  <input className="search-form__query_location" id="near" name="at"
                    placeholder={t('searchForm:townOrPostalCode')} type="search"
                    ref="searchLocationInput" defaultValue={searchLocation} />
                </div>
              </div>

            <input className="btn btn-default btn-lg search-form__button"
              style={{marginRight: '10px'}} type="submit" value={t('searchForm:search')} />

            <Link className="btn btn-default btn-lg search-form__button"
              to="/directory">{t('searchForm:browse')}</Link>

          </form>

          {moreOptions}
        </div>
      );
    }
    return (
      <div>
        <form className="search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>

          <input className="search-form__query"
            placeholder={t('searchForm:findSocialEnterprises')} type="search"
            ref="searchTextInput" defaultValue={searchText} />

          <input className="btn btn-default btn-lg search-form__button"
            style={{marginRight: '10px'}} type="submit" value={t('searchForm:search')} />

          <Link className="btn btn-default btn-lg search-form__button"
            to="/directory">{t('searchForm:browse')}</Link>

        </form>

        {moreOptions}
      </div>
    );
  }

  render() {
    if (!this.context.config.geo_api_root) {
      return (<Loading />);
    }

    if (this.state.locationDisambiguation && this.state.locationDisambiguation.length > 1) {
      return (
        <LocationDisambiguation locations={this.state.locationDisambiguation}
              handleLocationSelection={this.handleLocationSelection.bind(this)}/>
      );
    }

    let moreOptions = this.buildMoreOptionsButton();
    let searchForm = this.buildSearchForm(moreOptions);

    return searchForm;
  }
}

SearchFormComponent.displayName = 'SearchFormComponent';

SearchFormComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

// Uncomment properties you need
// SearchFormComponent.propTypes = {};
// SearchFormComponent.defaultProps = {};

export { SearchFormComponent };
export default translate('searchForm')(SearchFormComponent);
