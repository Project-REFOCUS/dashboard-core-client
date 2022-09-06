export default {
    control: base => ({
        ...base,
        '&:hover': {
            backgroundColor: '#D3ECFF',
            cursor: 'pointer'
        },
        minHeight: '30px'
    }),
    dropdownIndicator: base => ({
        ...base,
        justifyContent: 'space-between'
    }),
    indicatorSeparator: base => ({
        ...base,
        width: 0
    }),
    groupHeading: base => ({
        ...base,
        textTransform: 'none'
    }),
    multiValue: base => ({
        ...base,
        fontSize: '11px',
        lineHeight: '15px',
        color: '#000000',
        backgroundColor: '#DFE6E9',
        borderRadius: '4px'
    }),
    option: (base, state) => ({
        ...base,
        color: '#000000',
        backgroundColor: state.isSelected ? '#72BBF4' : base.backgroundColor,
        '&:hover': {
            backgroundColor: state.isSelected ? '#086EBE' : base.backgroundColor,
            cursor: 'pointer'
        }
    }),
    placeholder: base => ({
        ...base,
        color: '#B2BEC3'
    })
};
