import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { startLoading } from './isoxmlFile'
import { getTimeLogsCache } from './isoxmlFileInfo'

interface VisualSettingsState {
    gridsVisibility: Record<string, boolean>
    timeLogsVisibility: Record<string, boolean>
    partfieldsVisibility: Record<string, boolean>
    timeLogsSelectedValue: Record<string, string>
    excludeOutliers: Record<string, boolean>,
    fillMissingValues: Record<string, boolean>
}

const setDefaultTimeLogValue = (state: VisualSettingsState, id: string) => {
    if (!state.timeLogsSelectedValue[id] && state.timeLogsVisibility[id]) {
        const timeLogCache = getTimeLogsCache()[id]
        const variableValuesInfo = timeLogCache.valuesInfo.find(
            valueInfo => 'minValue' in valueInfo
        )
        if (variableValuesInfo) {
            state.timeLogsSelectedValue[id] = variableValuesInfo.valueKey
        }
    }
}

const initialState: VisualSettingsState = {
    gridsVisibility: {},
    timeLogsVisibility: {},
    partfieldsVisibility: {},
    timeLogsSelectedValue: {},
    excludeOutliers: {},
    fillMissingValues: {}
}

export const visualSettingsSlice = createSlice({
    name: 'visualSettings',
    initialState,
    reducers: {
        setGridVisibility: (state, action) => {
            const {gridId, visible} = action.payload
            state.gridsVisibility[gridId] = visible
        },
        setTimeLogVisibility: (state, action) => {
            const {timeLogId, visible} = action.payload
            state.timeLogsVisibility[timeLogId] = visible
            setDefaultTimeLogValue(state, timeLogId)
        },
        setPartfieldVisibility: (state, action) => {
            const {partfieldId, visible} = action.payload
            state.partfieldsVisibility[partfieldId] = visible
        },
        setTimeLogValue: (state, action) => {
            const {timeLogId, valueKey} = action.payload
            state.timeLogsSelectedValue[timeLogId] = valueKey
        },
        setExcludeOutliers: (state, action) => {
            const {timeLogId, exclude} = action.payload
            state.excludeOutliers[timeLogId] = exclude
        },
        setFillMissingOutliers: (state, action) => {
            const {timeLogId, fill} = action.payload
            state.fillMissingValues[timeLogId] = fill
        }
    },
    extraReducers: builder => {
        builder.addCase(startLoading, () => initialState)
    }
})

// actions
export const {
    setGridVisibility,
    setTimeLogVisibility,
    setPartfieldVisibility,
    setTimeLogValue,
    setExcludeOutliers,
    setFillMissingOutliers
} = visualSettingsSlice.actions

// selectors
export const gridsVisibilitySelector = (state: RootState) => state.visualSettings.gridsVisibility
export const gridVisibilitySelector =
    (state: RootState, gridId: string) => !!state.visualSettings.gridsVisibility[gridId]

export const timeLogsVisibilitySelector = (state: RootState) => state.visualSettings.timeLogsVisibility
export const timeLogVisibilitySelector =
    (state: RootState, timeLogId: string) => !!state.visualSettings.timeLogsVisibility[timeLogId]

export const partfieldsVisibilitySelector = (state: RootState) => state.visualSettings.partfieldsVisibility
export const partfieldVisibilitySelector =
    (state: RootState, partfieldId: string) => !!state.visualSettings.partfieldsVisibility[partfieldId]

export const timeLogsSelectedValueSelector = (state: RootState) => state.visualSettings.timeLogsSelectedValue
export const timeLogSelectedValueSelector =
    (state: RootState, timeLogId: string) => state.visualSettings.timeLogsSelectedValue[timeLogId]

export const timeLogsExcludeOutliersSelector = (state: RootState) => state.visualSettings.excludeOutliers
export const timeLogExcludeOutliersSelector =
    (state: RootState, timeLogId: string) => !!state.visualSettings.excludeOutliers[timeLogId]

export const timeLogsFillMissingValuesSelector = (state: RootState) => state.visualSettings.fillMissingValues
export const timeLogFillMissingValuesSelector =
    (state: RootState, timeLogId: string) => !!state.visualSettings.fillMissingValues[timeLogId]

export default visualSettingsSlice.reducer
