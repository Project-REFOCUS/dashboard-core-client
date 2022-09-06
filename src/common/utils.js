import { DAY_IN_MILLISECONDS } from './constants';

const isoDateFormatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});

export const getDateNDaysAgo = n => {
    const todayInMillis = new Date().getTime();
    const nDaysInMillis = DAY_IN_MILLISECONDS * n;
    const nDaysAgo = new Date(todayInMillis - nDaysInMillis);
    return isoDateFormatter.format(nDaysAgo);
};

export const toStatesParam = states => states ? states.map(s => s.value).join(',') : '';
