export const chartData=(label, percent)=>{
    return(
        {
            labels: [label],
            datasets: [
                {
                    data: [percent, 100 - percent],
                    backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)']
                }
            ]
        }
    )
}

export const frontOption={
    cutoutPercentage: 30,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    elements: {
        arc: {
            borderWidth: 190,
            borderColor: 'transparent',
            borderRadius: 50,
        },
    },
}

export const backgroundData = {
    labels: ['pink'],
    datasets: [
        {
            data: [100, 0],
            backgroundColor: ['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
        }
    ]
}

export const backgroundOptions = {
    cutoutPercentage: 30,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    elements: {
        arc: {
            borderWidth: 190,
            borderColor: 'transparent',
        },
    },
};