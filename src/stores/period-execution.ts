import {ref, reactive} from 'vue';
import {defineStore} from 'pinia';

export const usePeriodExecutionStore = defineStore('periodExecution', () => {
    const ONE_DAY = ref('oneDay');
    const TWO_DAYS = ref('twoDays');
    const THREE_DAYS = ref('threeDays');
    const FOUR_DAYS = ref('fourDays');
    const FIVE_DAYS = ref('fiveDays');
    const SIX_DAYS = ref('sixDays');
    const SEVEN_DAYS = ref('sevenDays');
    const TEN_DAYS = ref('tenDays');
    const TWO_WEEKS = ref('twoWeeks');
    const THREE_WEEKS = ref('threeWeeks');
    const ONE_MONTH = ref('oneMonth');
    const TWO_MONTHS = ref('twoMonths');

    const executions = ref([
        {
            value: ONE_DAY.value,
            name: '1 день',
        },
        {
            value: TWO_DAYS.value,
            name: '2 дня',
        },
        {
            value: THREE_DAYS.value,
            name: '3 дня',
        },
        {
            value: FOUR_DAYS.value,
            name: '4 дня',
        },
        {
            value: FIVE_DAYS.value,
            name: '5 дней',
        },
        {
            value: SIX_DAYS.value,
            name: '6 дней',
        },
        {
            value: SEVEN_DAYS.value,
            name: '7 дней',
        },
        {
            value: TEN_DAYS.value,
            name: '10 дней',
        },
        {
            value: TWO_WEEKS.value,
            name: '2 недели',
        },
        {
            value: THREE_WEEKS.value,
            name: '3 недели',
        },
        {
            value: ONE_MONTH.value,
            name: '1 месяц',
        },
        {
            value: TWO_MONTHS.value,
            name: '2 месяца',
        }
    ]);

    return {
        ONE_DAY,
        TWO_DAYS,
        THREE_DAYS,
        FOUR_DAYS,
        FIVE_DAYS,
        SIX_DAYS,
        SEVEN_DAYS,
        TEN_DAYS,
        TWO_WEEKS,
        THREE_WEEKS,
        ONE_MONTH,
        TWO_MONTHS,
        executions,
    }
})