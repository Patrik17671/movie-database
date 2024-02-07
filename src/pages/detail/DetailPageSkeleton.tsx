import React from 'react';
import { Paper, Grid, Box, Skeleton } from '@mui/material';
import styles from './DetailPage.module.scss';
import times from 'lodash/times';

const DetailPageSkeleton = () => {
  return (
    <div className={styles.detail}>
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton width="60%" height={60} />
            <Box display="flex" flexDirection="row" alignItems="center" sx={{ my: 2 }}>
              {times(3, index => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={80}
                  height={30}
                  sx={{ marginRight: 1 }}
                />
              ))}
            </Box>
            <Skeleton width="100%" height={30} sx={{ my: 1 }} />
            <Skeleton width="80%" height={30} sx={{ my: 1 }} />
            <Box sx={{ my: 2 }}>
              {times(3, index => (
                <Box key={index} display="inline-block" sx={{ marginRight: 2 }}>
                  <Skeleton width={100} height={20} />
                  <Skeleton width={60} height={20} sx={{ mt: 0.5 }} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {times(6, index => (
              <Grid item xs={6} sm={4} key={index}>
                <Skeleton width="80%" height={30} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default DetailPageSkeleton;
