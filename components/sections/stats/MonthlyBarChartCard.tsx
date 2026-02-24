import {Text, View} from 'react-native'
import {CartesianChart, Bar} from 'victory-native'

type ChartPoint = {x: string; y: number}

type Props = {
  monthLabels: string[]
  data: number[]
  color: string
}

const MonthlyBarChartCard = ({monthLabels, data, color}: Props) => {
  const chartData: ChartPoint[] = [
    {x: '', y: 0},
    ...monthLabels.map((label, i) => ({x: label, y: data[i] ?? 0})),
    {x: '', y: 0},
  ]

  const maxY = Math.max(...data, 5)
  const steps = 5
  const stepSize = Math.ceil(maxY / (steps - 1)) || 1
  const yTicks = Array.from({length: steps}, (_, i) => maxY - i * stepSize)

  return (
    <View className="my-4 items-center">
      <View className="w-full">
        <View className="bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-sm py-6 items-center">
          <View className="flex-row w-full items-center">
            <View className="h-56 justify-between items-end mr-1 py-2">
              {yTicks.map((tick, idx) => (
                <Text
                  key={idx}
                  className="text-xs text-gray-400 dark:text-gray-500 font-titillium-semibold text-right min-w-[24px]">
                  {tick}
                </Text>
              ))}
            </View>

            <View className="h-56 flex-1 px-2">
              <CartesianChart data={chartData} xKey="x" yKeys={['y']}>
                {({points, chartBounds}) => (
                  <Bar
                    points={points.y}
                    chartBounds={chartBounds}
                    color={color}
                    barWidth={9}
                    roundedCorners={{topLeft: 6, topRight: 6}}
                  />
                )}
              </CartesianChart>
            </View>
          </View>

          <View className="flex-row items-center mt-1 w-full">
            <View className="min-w-[24px] mr-1" />
            {['', ...monthLabels, ''].map((label, idx) => (
              <Text
                key={idx}
                className="flex-1 text-xs text-gray-500 dark:text-gray-300 font-titillium-semibold text-center">
                {label}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default MonthlyBarChartCard
