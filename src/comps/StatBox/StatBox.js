import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import './StatBox.scss';


export default function() {
  return (
    <Grid container spacing={3} className='stats-grid'>
      <Grid item xs={6} className='stats-cell'>
        <Card>
          1
        </Card>
      </Grid >
      <Grid item xs={6} className='stats-cell'>
        <Card>
          2
        </Card>
      </Grid>
      <Grid item xs={6} className='stats-cell'>
        <Card>
          3
        </Card>
      </Grid>
      <Grid item xs={6} className='stats-cell'>
        <Card>
          4
        </Card>
      </Grid>
    </Grid>
  )
}