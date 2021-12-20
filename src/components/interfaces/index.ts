interface Filter {
    filterOption: 'all' | 'active' | 'completed';
}

interface ListItemProps {
    item: Item;
}

interface InitStateProps {
    loading: boolean;
    todolist: Item[];
    paginatedList: Item[];
    filter: Filter;
    lengthOfArr: number;
    take: number;
    skip: number;
    currentPage: number;
}

interface Item {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    filter?: Filter;
}

interface Actions {
    type: string;
    payload: any; // here
}

// interface Payload {
//     userId?: number;
//     id?: number;
//     text?: string;
//     title?: string;
//     filter?: Filter;
//     completed?: boolean;
//     skip: number;
//     todolist?: Item[];
//     paginatedList?: Item[];
// }

export {
    Filter,
    ListItemProps, 
    Item,
    InitStateProps,
    Actions
}