import * as React from 'react';
import { HitBlockMap, BlockedHit } from '../../types';
import { Card } from '@shopify/polaris';
import BlockListCard from './BlockListCard';
import EmptyBlockList from './EmptyBlockList';

export interface Props {
  readonly blockList: HitBlockMap;
}

export interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockList extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return this.props.blockList.isEmpty() ? (
      <EmptyBlockList />
    ) : (
      <Card>
        {this.props.blockList.toList().map((el: BlockedHit) => {
          return (
            <BlockListCard
              key={el.groupId}
              item={el}
              onUnblock={this.props.onUnblock}
            />
          );
        })}
      </Card>
    );
  }
}

export default BlockList;
