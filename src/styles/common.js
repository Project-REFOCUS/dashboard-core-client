export const ReactSelectStyle = {
    control: base => ({
        ...base,
        '&:hover': {
            backgroundColor: '#D3ECFF',
            cursor: 'pointer'
        },
        minHeight: '30px'
    }),
    indicatorSeparator: base => ({
        ...base,
        width: 0
    }),
    valueContainer: base => ({
        ...base,
        padding: '0 8px'
    }),
    singleValue: base => ({
        ...base,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#72BBF4' : base.backgroundColor,
        '&:hover': {
            backgroundColor: state.isSelected ? '#086EBE' : base.backgroundColor,
            cursor: 'pointer'
        }
    }),
    placeholder: base => ({
        ...base
    })
};
