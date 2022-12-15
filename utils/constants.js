export const courseOptions = [
    {
        value: 'CSE',
        label: 'Computer Science Engineering'
    },
    {
        value: 'ECE',
        label: 'Electronics and Communication Engineering'
    },
    {
        value: 'EE',
        label: 'Electrical Engineering'
    },
    {
        value: 'ME',
        label: 'Mechanical Engineering'
    },
    {
        value: 'CE',
        label: 'Civil Engineering'
    }
];

export const semesterOptions = Array(8)
    .fill(0)
    .map((_, index) => {
        return {
            value: index + 1,
            label: `${index + 1} Semester`
        };
    });