import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, { useCallback } from 'react';

import { useStore } from './store';
import { VisibilitiesKey } from './type';

const VisibilityCheckbox: React.FC<{
  vKey: VisibilitiesKey;
  label: string;
}> = ({ vKey, label }) => {
  const { state, dispatch } = useStore();
  const dispatchSetVisibility = useCallback(
    (_, value: boolean) =>
      dispatch({
        type: 'SET_VISIBILITY',
        payload: { key: vKey, value },
      }),
    [vKey, dispatch],
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={state.visibilities[vKey]}
          onChange={dispatchSetVisibility}
          disabled={state.visibilities.bezierOnly && vKey !== 'bezierOnly'}
          color={vKey === 'bezierOnly' ? 'secondary' : 'primary'}
        />
      }
      label={label}
    />
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
});

const Visibilities: React.FC = () => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.root}>
      <VisibilityCheckbox vKey="bezierOnly" label="ベジエ曲線のみ" />
      <VisibilityCheckbox vKey="tangent" label="接線" />
      <VisibilityCheckbox vKey="osculatingCircle" label="接触円" />
      <VisibilityCheckbox vKey="curvatureComb" label="曲率の櫛" />
    </FormGroup>
  );
};

export default Visibilities;
