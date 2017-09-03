import * as React from 'react';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';
import TimeLastSearch from './TimeLastSearch';

export interface Props {
  readonly settingsActive: boolean;
  readonly searchActive: boolean;
}

export interface Handlers {
  readonly onToggleSettings: () => void;
  readonly onToggleSearch: (active: boolean) => void;
}

class SearchButtons extends React.PureComponent<Props & Handlers, never> {
  private handleSearch = () => {
    this.props.onToggleSearch(this.props.searchActive);
  };

  static searchButtonText = (active: boolean) => {
    return active ? 'Stop searching' : 'Start searching';
  };

  static settingsButtonText = (active: boolean) => {
    return active ? 'Hide search settings' : 'Edit search settings';
  };

  public render() {
    const { onToggleSettings, settingsActive, searchActive } = this.props;

    return (
      <Stack vertical={false} alignment="baseline">
        <ButtonGroup segmented>
          <Button
            primary
            icon="search"
            onClick={this.handleSearch}
            destructive={searchActive}
          >
            {SearchButtons.searchButtonText(searchActive)}
          </Button>
          <Button onClick={onToggleSettings}>
            {SearchButtons.settingsButtonText(settingsActive)}
          </Button>
        </ButtonGroup>
        <TimeLastSearch />
      </Stack>
    );
  }
}

export default SearchButtons;
