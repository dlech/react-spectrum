import {action} from '@storybook/addon-actions';
import {ActionButton} from '@react-spectrum/button';
import {ActionGroup} from '@react-spectrum/actiongroup';
import {ActionMenu, Menu, MenuTrigger} from '@react-spectrum/menu';
import Add from '@spectrum-icons/workflow/Add';
import {Content, View} from '@react-spectrum/view';
import Copy from '@spectrum-icons/workflow/Copy';
import Delete from '@spectrum-icons/workflow/Delete';
import {Droppable} from '@react-aria/dnd/stories/dnd.stories';
import Edit from '@spectrum-icons/workflow/Edit';
import {Flex} from '@react-spectrum/layout';
import Folder from '@spectrum-icons/workflow/Folder';
import {Heading, Text} from '@react-spectrum/text';
import {IllustratedMessage} from '@react-spectrum/illustratedmessage';
import Info from '@spectrum-icons/workflow/Info';
import {Item, ListView} from '../';
import {ItemDropTarget} from '@react-types/shared';
import {Link} from '@react-spectrum/link';
import MoreSmall from '@spectrum-icons/workflow/MoreSmall';
import NoSearchResults from '@spectrum-icons/illustrations/src/NoSearchResults';
import React, {useEffect, useState} from 'react';
import {storiesOf} from '@storybook/react';
import {useAsyncList, useListData} from '@react-stately/data';
import {useDragHooks, useDropHooks} from '@react-spectrum/dnd';

const items = [
  {key: 'a', textValue: 'Item a', isDraggable: true},
  {key: 'b', textValue: 'Item b', isDraggable: true},
  {key: 'c', textValue: 'Item c', isDraggable: false},
  {key: 'd', textValue: 'Item d', isDraggable: true},
  {key: 'e', textValue: 'Item e', isDraggable: false},
  {key: 'f', textValue: 'Item f', isDraggable: true},
  {key: 'g', textValue: 'Item g', isDraggable: true},
  {key: 'h', textValue: 'Item h', isDraggable: true},
  {key: 'i', textValue: 'Item i', isDraggable: true},
  {key: 'j', textValue: 'Item j', isDraggable: true},
  {key: 'k', textValue: 'Item k', isDraggable: true},
  {key: 'l', textValue: 'Item l', isDraggable: true},
  {key: 'm', textValue: 'Item m', isDraggable: false},
  {key: 'n', textValue: 'Item n', isDraggable: true}
];

function renderEmptyState() {
  return (
    <IllustratedMessage>
      <svg width="150" height="103" viewBox="0 0 150 103">
        <path d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z" />
      </svg>
      <Heading>No results</Heading>
      <Content>No results found</Content>
    </IllustratedMessage>
  );
}

storiesOf('ListView', module)
  .add('default', () => (
    <ListView width="250px">
      <Item textValue="row 1">row 1</Item>
      <Item textValue="row 2">row 2</Item>
      <Item textValue="row 3">row 3</Item>
    </ListView>
  ))
  .add('isQuiet', () => (
    <ListView width="250px" isQuiet>
      <Item textValue="row 1">row 1</Item>
      <Item textValue="row 2">row 2</Item>
      <Item textValue="row 3">row 3</Item>
    </ListView>
  ))
  .add('with buttons', () => (
    <ListView width="300px">
      <Item textValue="row 1">
        <Content>row 1</Content>
        <ActionButton>Button 1</ActionButton>
      </Item>
      <Item textValue="row 2">
        <Content>row 2</Content>
        <ActionButton>Button 1</ActionButton>
      </Item>
      <Item textValue="row 3">
        <Content>row 3</Content>
        <ActionButton>Button 1</ActionButton>
      </Item>
    </ListView>
  ))
  .add('dynamic items', () => (
    <ListView items={items} width="300px" height="250px">
      {(item) => (
        <Item key={item.key} textValue={item.textValue}>
          <Content>
            <Flex alignItems="center" gap="10px">
              <View flexGrow={1}>Item {item.key}</View> {/* TODO */}
              <ActionButton><Add /></ActionButton>
              <MenuTrigger>
                <ActionButton><MoreSmall /></ActionButton>
                <Menu>
                  <Item>
                    <Edit />
                    <Text>Edit</Text>
                  </Item>
                  <Item>
                    <Delete />
                    <Text>Delete</Text>
                  </Item>
                </Menu>
              </MenuTrigger>
            </Flex>
          </Content>
        </Item>
        )}
    </ListView>
    )
  )
  .add('falsy ids as keys', () => (
    <FalsyIds />
  ))
  .add('empty list', () => (
    <ListView width="300px" height="300px" renderEmptyState={renderEmptyState}>
      {[]}
    </ListView>
  ))
  .add('loading', () => (
    <ListView width="300px" height="300px" loadingState="loading">
      {[]}
    </ListView>
  ))
  .add('loadingMore', () => (
    <ListView width="300px" height="300px" loadingState="loadingMore">
      <Item textValue="row 1">row 1</Item>
      <Item textValue="row 2">row 2</Item>
      <Item textValue="row 3">row 3</Item>
    </ListView>
  ))
  .add('async listview loading', () => (
    <AsyncList />
  ))
  .add('density: compact', () => (
    <ListView width="250px" density="compact">
      <Item textValue="row 1">row 1</Item>
      <Item textValue="row 2">row 2</Item>
      <Item textValue="row 3">row 3</Item>
    </ListView>
  ))
  .add('density: spacious', () => (
    <ListView width="250px" density="spacious">
      <Item textValue="row 1">row 1</Item>
      <Item textValue="row 2">row 2</Item>
      <Item textValue="row 3">row 3</Item>
    </ListView>
  ))
  .add('selection: none', () => (
    <Example selectionMode="none" />
  ))
  .add('selection: single, checkbox', () => (
    <Example selectionMode="single" />
  ))
  .add('selection: single, checkbox, disabled', () => (
    <Example selectionMode="single" disabledKeys={['row1']} />
  ))
  .add('selection: single, checkbox, isQuiet', () => (
    <Example selectionMode="single" isQuiet />
  ))
  .add('selection: multiple, checkbox', () => (
    <Example selectionMode="multiple" />
  ))
  .add('selection: multiple, checkbox, isQuiet', () => (
    <Example selectionMode="multiple" isQuiet />
  ))
  .add('parent link example', () => (
    <Example2 selectionMode="multiple" />
  ))
  .add('actions: ActionButton', () =>
    renderActionsExample(props => <ActionButton {...props}><Copy /></ActionButton>))
  .add('actions: ActionGroup', () =>
    renderActionsExample(props => (
      <ActionGroup buttonLabelBehavior="hide" {...props}>
        <Item key="add">
          <Add />
          <Text>Add</Text>
        </Item>
        <Item key="delete">
          <Delete />
          <Text>Delete</Text>
        </Item>
      </ActionGroup>
    )))
  .add('actions: ActionMenu', () =>
    renderActionsExample(props => (
      <ActionMenu {...props}>
        <Item key="add">
          <Add />
          <Text>Add</Text>
        </Item>
        <Item key="delete">
          <Delete />
          <Text>Delete</Text>
        </Item>
      </ActionMenu>
    )))
  .add('actions: ActionGroup + ActionMenu', () =>
    renderActionsExample(props => (
      <>
        <ActionGroup buttonLabelBehavior="hide" {...props} slot="actionGroup">
          <Item key="info">
            <Info />
            <Text>Info</Text>
          </Item>
        </ActionGroup>
        <ActionMenu {...props} slot="actionMenu">
          <Item key="add">
            <Add />
            <Text>Add</Text>
          </Item>
          <Item key="delete">
            <Delete />
            <Text>Delete</Text>
          </Item>
        </ActionMenu>
      </>
    )))
  .add('dynamic items + renderEmptyState', () => (<EmptyTest />))
  .add('selectionStyle: highlight', () => (
    <ListView width="250px" height={400} onSelectionChange={action('onSelectionChange')} selectionStyle="highlight" selectionMode="multiple" items={[...Array(20).keys()].map(k => ({key: k, name: `Item ${k}`}))}>
      {item => <Item>{item.name}</Item>}
    </ListView>
  ))
  .add('selectionStyle: highlight, onAction', () => (
    <ListView width="250px" height={400} onSelectionChange={action('onSelectionChange')} selectionStyle="highlight" selectionMode="multiple" items={[...Array(20).keys()].map(k => ({key: k, name: `Item ${k}`}))} onAction={action('onAction')}>
      {item => <Item>{item.name}</Item>}
    </ListView>
  ))
  .add('selectionMode: none, onAction', () => (
    <ListView width="250px" height={400} onSelectionChange={action('onSelectionChange')} selectionMode="none" items={[...Array(20).keys()].map(k => ({key: k, name: `Item ${k}`}))} onAction={action('onAction')}>
      {item => <Item>{item.name}</Item>}
    </ListView>
  ));

storiesOf('ListView/Drag and Drop', module)
    .add(
      'Drag out of list',
      () => (
        <Flex direction="row" wrap alignItems="center">
          <input />
          <Droppable />
          <DragExample
            dragHookOptions={{onDragStart: action('dragStart'), onDragEnd: action('dragEnd')}} />
        </Flex>
      )
    )
  .add(
    'Drag within list (Reorder)',
    () => (
      <Flex direction="row" wrap alignItems="center">
        <ReorderExample />
      </Flex>
    )
  )
  .add(
    'Drag into folder',
    () => (
      <Flex direction="row" wrap alignItems="center">
        <DragIntoItemExample />
      </Flex>
    )
  )
  .add(
    'Drag between lists',
    () => (
      <Flex direction="row" wrap alignItems="center">
        <DragBetweenListsExample />
      </Flex>
    )
  );


function Example(props?) {
  return (
    <ListView width="250px" onSelectionChange={action('onSelectionChange')} {...props}>
      <Item key="folder1" hasChildItems>
        <Content>folder 1</Content>
      </Item>
      <Item key="row1" textValue="row 1">
        <Content>row 1</Content>
      </Item>
      <Item key="row2" textValue="row 2">
        <Content>row 2</Content>
      </Item>
      <Item key="row3" textValue="row 3">
        <Content>row 3</Content>
      </Item>
    </ListView>
  );
}

function Example2(props?) {
  return (
    <ListView width="250px" onSelectionChange={action('onSelectionChange')} {...props}>
      <Item key="folder1" hasChildItems>
        <Link>folder 1</Link>
      </Item>
      <Item textValue="row 1">
        <Content>row 1</Content>
      </Item>
      <Item textValue="row 2">
        <Content>row 2</Content>
      </Item>
      <Item textValue="row 3">
        <Content>row 3</Content>
      </Item>
    </ListView>
  );
}

function renderActionsExample(renderActions, props?) {
  return (
    <ListView width="300px" selectionMode="single" {...props} onSelectionChange={keys => console.log('sel', keys)}>
      <Item key="a" textValue="folder 1" hasChildItems>
        <Folder />
        <Link>folder 1</Link>
        <Text slot="description">description for folder 1</Text>
        {renderActions({onPress: action('actionPress')})}
      </Item>
      <Item key="b" textValue="row 1">
        <Text>row 1</Text>
        <Text slot="description">description for row 1</Text>
        {renderActions({onPress: action('actionPress')})}
      </Item>
      <Item key="c" textValue="row 2">
        <Text>row 2</Text>
        <Text slot="description">description for row 2</Text>
        {renderActions({onPress: action('actionPress')})}
      </Item>
      <Item key="d" textValue="row 3">
        <Text>row 3</Text>
        <Text slot="description">description for row 3</Text>
        {renderActions({onPress: action('actionPress')})}
      </Item>
    </ListView>
  );
}

let i = 0;
function EmptyTest() {
  const [items, setItems] = useState([]);
  const [divProps, setDivProps] = useState({});

  useEffect(() => {
    let newItems = [];
    for (i = 0; i < 20; i++) {
      newItems.push({key: i, name: `Item ${i}`});
    }
    setItems(newItems);
  }, []);

  const renderEmpty = () => (
    <IllustratedMessage>
      <NoSearchResults />
      <Heading>No items</Heading>
    </IllustratedMessage>
  );
  let hasDivProps = Object.keys(divProps).length > 0;
  return (
    <div>
      <Flex direction="row">
        <div {...divProps}>
          <ListView items={items} width="250px" height={hasDivProps ? null : '500px'} renderEmptyState={renderEmpty}>
            {
              item => (
                <Item key={item.key}>
                  <Content>{item.name}</Content>
                </Item>
              )
            }
          </ListView>
        </div>
        <div style={{paddingLeft: '10px'}}>
          <ActionButton
            isDisabled={hasDivProps}
            onPress={() => setDivProps({style: {display: 'flex', flexGrow: 1, minWidth: '200px', maxHeight: '500px'}})}>
            Use flex div wrapper (no set height)
          </ActionButton>
          <Flex gap={10} marginTop={10}>
            <ActionButton onPress={() => setItems([])}>
              Clear All
            </ActionButton>
            <ActionButton
              onPress={() => {
                let newArr = [...items];
                newArr.push({key: i++, name: `Item ${i}`});
                setItems(newArr);
              }}>
              Add 1
            </ActionButton>
            <ActionButton
              onPress={() => {
                let newItems = [...items];
                setItems(newItems.slice(0, 4));
              }}>
              Slice (0, 4)
            </ActionButton>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}


export function DragExample(props?) {
  let {listViewProps, dragHookOptions} = props;
  let getItems = (keys) => [...keys].map(key => {
    let item = items.find(item => item.key === key);
    return {
      'text/plain': item.textValue
    };
  });

  let allowsDraggingItem = (key) => {
    let item = items.find(item => item.key === key);
    return item.isDraggable;
  };

  let dragHooks = useDragHooks({
    allowsDraggingItem,
    getItems,
    ...dragHookOptions
  });

  return (
    <ListView
      aria-label="draggable list view"
      width="300px"
      selectionMode="multiple"
      items={items}
      disabledKeys={['f']}
      dragHooks={dragHooks}
      {...listViewProps}>
      {(item: any) => (
        <Item key={item.key} textValue={item.textValue}>
          <Content>
            <Flex alignItems="center" gap="10px">
              <View flexGrow={1}>Item {item.key}</View>
              <ActionButton><Add /></ActionButton>
              <MenuTrigger>
                <ActionButton><MoreSmall /></ActionButton>
                <Menu>
                  <Item textValue="Edit">
                    <Edit />
                    <Text>Edit</Text>
                  </Item>
                  <Item textValue="Delete">
                    <Delete />
                    <Text>Delete</Text>
                  </Item>
                </Menu>
              </MenuTrigger>
            </Flex>
          </Content>
        </Item>
      )}
    </ListView>
  );
}

export function ReorderExample() {
  let onDropAction = action('onDrop');

  let list = useListData({
    initialItems: [
      {id: '1', type: 'item', textValue: 'One'},
      {id: '2', type: 'item', textValue: 'Two'},
      {id: '3', type: 'item', textValue: 'Three'},
      {id: '4', type: 'item', textValue: 'Four'},
      {id: '5', type: 'item', textValue: 'Five'},
      {id: '6', type: 'item', textValue: 'Six'}
    ]
  });

  // Use a random drag type so the items can only be reordered within this list and not dragged elsewhere.
  let dragType = React.useMemo(() => `keys-${Math.random().toString(36).slice(2)}`, []);

  let onMove = (keys: React.Key[], target: ItemDropTarget) => {
    if (target.dropPosition === 'before') {
      list.moveBefore(target.key, keys);
    } else {
      list.moveAfter(target.key, keys);
    }
  };

  let dragHooks = useDragHooks({
    allowsDraggingItem: () => true,
    getItems(keys) {
      return [...keys].map(key => ({
        [dragType]: JSON.stringify(key)
      }));
    },
    onDragStart: action('dragStart'),
    onDragEnd: action('dragEnd')
  });

  let dropHooks = useDropHooks({
    async onDrop(e) {
      if (e.target.type !== 'root' && e.target.dropPosition !== 'on') {

        let keys = [];
        for (let item of e.items) {
          if (item.kind === 'text' && item.types.has(dragType)) {
            let key = JSON.parse(await item.getText(dragType));
            keys.push(key);
          }
        }
        onDropAction(e);
        onMove(keys, e.target);
      } 
    },
    getDropOperation(target) {
      if (target.type === 'root' || target.dropPosition === 'on') {
        return 'cancel';
      }

      return 'move';
    }
  });
  

  return (
    <ListView
      aria-label="reorderable list view"
      selectionMode="multiple"
      width="300px"
      items={list.items}
      disabledKeys={['2']}
      dragHooks={dragHooks}
      dropHooks={dropHooks}>
      {(item: any) => (
        <Item key={item.id} textValue={item.textValue}>
          Item {item.id}
        </Item>
      )}
    </ListView>
  );
}

export function DragIntoItemExample() {
  let [droppedItems, setDroppedItems] = useState([]);

  let list = useListData({
    initialItems: [
      {id: '0', type: 'folder', textValue: 'Folder', isFolder: true},
      {id: '1', type: 'item', textValue: 'One'},
      {id: '2', type: 'item', textValue: 'Two'},
      {id: '3', type: 'item', textValue: 'Three'},
      {id: '4', type: 'item', textValue: 'Four'},
      {id: '5', type: 'item', textValue: 'Five'},
      {id: '6', type: 'item', textValue: 'Six'}
    ]
  });

  let getItems = (keys) => [...keys].map(id => {
    let item = list.items.find(item => item.id === id);
    return {
      'text/plain': item.textValue
    };
  });

  let dragHooks = useDragHooks({
    allowsDraggingItem: (id) => id !== '0',
    getItems
  });

  let dropHooks = useDropHooks({
    onDrop: async e => {
      if (e.target.type === 'item' && e.target.key === '0' && e.target.dropPosition === 'on') {
        // list.remove();
        setDroppedItems((prevDropped) => [...prevDropped, e.target]);
      }
    }
  });

  return (
    <ListView
      aria-label="Drop into list view item example"
      selectionMode="multiple"
      width="300px"
      items={list.items}
      disabledKeys={['2']}
      dragHooks={dragHooks}
      dropHooks={dropHooks}>
      {(item: any) => (
        <Item key={item.id} textValue={item.textValue} hasChildItems={item.isFolder}>
          <Text>{item.isFolder ? 'Drop items here' : `Item ${item.textValue}`}</Text>
          {item.isFolder && 
            <>
              <Folder />
              <Text slot="description">contains {droppedItems.length} dropped item(s)</Text>
            </>
          }
        </Item>
      )}
    </ListView>
  );
}

export function DragBetweenListsExample() {

  let list1 = useListData({
    initialItems: [
      {id: '1', type: 'item', textValue: 'One'},
      {id: '2', type: 'item', textValue: 'Two'},
      {id: '3', type: 'item', textValue: 'Three'},
      {id: '4', type: 'item', textValue: 'Four'},
      {id: '5', type: 'item', textValue: 'Five'},
      {id: '6', type: 'item', textValue: 'Six'}
    ]
  });

  let list2 = useListData({
    initialItems: [
      {id: '7', type: 'item', textValue: 'Seven'},
      {id: '8', type: 'item', textValue: 'Eight'},
      {id: '9', type: 'item', textValue: 'Nine'},
      {id: '10', type: 'item', textValue: 'Ten'},
      {id: '11', type: 'item', textValue: 'Eleven'},
      {id: '12', type: 'item', textValue: 'Twelve'}
    ]
  });
  
  let onMove = (keys: React.Key[], target: ItemDropTarget) => {
    let targetList = list1;
    if (target.dropPosition === 'before') {
      targetList.moveBefore(target.key, keys);
    } else {
      targetList.moveAfter(target.key, keys);
    }
  };

  let getItems = (keys) => [...keys].map(id => {
    let item = list1.items.find(item => item.id === id);
    return {
      'text/plain': item.textValue
    };
  });

  let dragHooks = useDragHooks({
    allowsDraggingItem: () => true,
    getItems
  });

  // Use a random drag type so the items can only be reordered within this list and not dragged elsewhere.
  let dragType = React.useMemo(() => `keys-${Math.random().toString(36).slice(2)}`, []);

  let dropHooks = useDropHooks({
    onDrop: async e => {
      console.log('onDrop', e);
      if (e.target.type !== 'root' && e.target.dropPosition !== 'on') {
        let keys = [];
        for (let item of e.items) {
          if (item.kind === 'text' && item.types.has(dragType)) {
            let key = JSON.parse(await item.getText(dragType));
            keys.push(key);
          }
        }

        onMove(keys, e.target);
      }
    }
  });

  return (
    <>
      <Flex direction="column" margin="size-100">
        <Text alignSelf="center">List 1</Text>
        <ListView
          aria-label="First list view"
          selectionMode="multiple"
          width="300px"
          items={list1.items}
          disabledKeys={['2']}
          dragHooks={dragHooks}
          dropHooks={dropHooks}>
          {(item: any) => (
            <Item key={item.id} textValue={item.textValue}>
              Item {item.textValue}
            </Item>
        )}
        </ListView>
      </Flex>
      <Flex direction="column" margin="size-100">
        <Text alignSelf="center">List 2</Text>
        <ListView
          aria-label="Second list view"
          selectionMode="multiple"
          width="300px"
          items={list2.items}
          disabledKeys={['2']}
          dragHooks={dragHooks}
          dropHooks={dropHooks}>
          {(item: any) => (
            <Item key={item.id} textValue={item.textValue}>
              Item {item.textValue}
            </Item>
        )}
        </ListView>
      </Flex>
    </>
  );
}

function AsyncList() {
  interface StarWarsChar {
    name: string,
    url: string
  }

  let list = useAsyncList<StarWarsChar>({
    async load({signal, cursor}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // Slow down load so progress circle can appear
      await new Promise(resolve => setTimeout(resolve, 1500));
      let res = await fetch(cursor || 'https://swapi.py4e.com/api/people/?search=', {signal});
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });
  return (
    <ListView
      selectionMode="multiple"
      aria-label="example async loading list"
      width="size-6000"
      height="size-3000"
      items={list.items}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}>
      {(item) => (
        <Item key={item.name} textValue={item.name}>{item.name}</Item>
      )}
    </ListView>
  );
}

function FalsyIds() {
  let items = [
    {id: 1, name: 'key=1'},
    {id: 0, name: 'key=0'}
  ];

  return (
    <ListView width="250px" height={400} selectionMode="multiple" onSelectionChange={action('onSelectionChange')} items={items} onAction={action('onAction')}>
      {item => <Item>{item.name}</Item>}
    </ListView>
  );
}
