# Amazon Location Service Samples

## Introduction

This is a set of sample applications for Amazon Location Service. For more information, please
consult the [Amazon Location Service Developer
Guide](https://docs.aws.amazon.com/location/latest/developerguide).

## Helper Libraries

[Amazon Location Helpers](amazon-location-helpers/)
([`amazon-location-helpers`](https://www.npmjs.com/package/amazon-location-helpers)) is a JavaScript
library that streamlines the use of [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/api/)
with Amazon Location Service.

[Amazon Aurora UDFs for Amazon Location Service](aurora-udfs/) is a set of [AWS Lambda and
user-defined
functions](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/PostgreSQL-Lambda.html) for
[Amazon Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/postgresql-features/) that enable
querying [Amazon Location Service](https://aws.amazon.com/location/) using SQL. These facilitate
cleaning, validating, and enriching data in place.

## Sample Applications

### Maps / MapLibre

* [Using MapLibre GL JS with Amazon Location Service](maplibre-gl-js/) `#javascript`
* [Using MapLibre GL JS with Amazon Location Service and AWS Amplify](maplibre-gl-js-amplify/) `#javascript` `#amplify`
* [Using MapLibre GL JS with Amazon Location Service in a React application](maplibre-gl-js-react/) `#javascript` `#react`
* [Using MapLibre GL JS with Amazon Location Service and AWS Amplify in a React application](maplibre-gl-js-react-amplify/) `#javascript` `#react` `#amplify`
* [Using MapLibre GL JS with Amazon Location Service and AWS Amplify in a Create React App application](https://github.com/aws-amplify/amplify-js-samples/tree/main/samples/react/geo/display-map) `#javascript` `#react` `#amplify`
* [Using `react-map-gl` with Amazon Location Service and AWS Amplify](react-map-gl-amplify/) `#javascript` `#react` `#amplify`
* [Using MapLibre GL JS with Amazon Location Service and AWS Amplify in a Vue.js application](maplibre-gl-js-vue-amplify/) `#javascript` `#vue` `#amplify`
* [Using MapLibre Native for Android with Amazon Location Service](maplibre-native-android/) `#android`
* [Using MapLibre Native for iOS with Amazon Location Service](maplibre-native-ios/) `#ios`
* [Create a custom map style with Amazon Location Service](create-custom-map-style/)
* [Realtime IoT Dashboard with AWS AppSync and Amazon Location Service](https://github.com/aws-samples/aws-appsync-iot-core-realtime-dashboard) `#javascript` `#react` `#iot` `#amplify`

### Maps / Leaflet

* [Using Leaflet with Amazon Location Service and AWS Amplify in a Vue.js application](leaflet-vue-amplify/) `#javascript` `#vue` `#amplify`

### Maps / Tangram

* [Using Tangram with Amazon Location Service](tangram-js/) `#javascript`
* [Using Tangram ES for Android with Amazon Location Service](tangram-es-android/) `#android`
* [Using Tangram ES for iOS with Amazon Location Service](tangram-es-ios/) `#ios`

### Places

* [Geocode address data in Amazon Aurora](geocode-udf-lambda-aurora/) `#aurora`
* [Geocode address data in Amazon Redshift](geocode-udf-lambda-redshift/) `#redshift`
* [Amazon Redshift User Defined Functions to call Amazon Location Service APIs](https://github.com/aws-samples/amazon-redshift-location-user-defined-functions) `#redshift`
* [Amazon Location UDFs for Athena](athena-udfs/) `#athena`
* [Geocode and Reverse-Geocode CSV files using S3 and Lambda](https://github.com/aws-samples/amazon-location-service-serverless-address-validation) `#s3` `#lambda`
### Tracking

* [Location Tracking with AWS Amplify on Android](tracking-android/) `#android` `#amplify`
* [Location Tracking with AWS Amplify on iOS](tracking-ios/) `#ios` `#amplify`
* [Asset tracking with Amazon Location, Amplify, and IoT Core](maplibre-js-react-iot-asset-tracking/) `#javascript` `#react` `#amplify` `#iot`
* [React Native Mobile Tracking App](https://github.com/aws-samples/amazon-location-service-mobile-tracker-react) `#javascript` `#react-native`
* [Amazon Location Service GeoTrack Vue.js](https://github.com/aws-samples/amazon-location-service-geotrack-vuejs) `#javascript` `#vue.js`

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
