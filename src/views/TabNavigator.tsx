import { TabBarButton } from "@components/atoms/TabBarButton";
import { TabBarLabel } from "@components/atoms/TabBarLabel";
import { colors } from "@constants";
import { selectAnnouncement } from "@features/announcement/selectors";
import { Dashboard } from "@features/dashboard/views/Dashboard";
import Profile from "@features/profile/views/Profile";
import { Scan } from "@features/scan/views/Scan";
import { useInitialTab } from "@navigation/hooks/useInitialTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImageSourcePropType } from "react-native";
import { useSelector } from "react-redux";

import { TabScreen } from "./screens";
import { TabBarIcon } from "./TabBarIcon";

const assets = {
  dashboardInactive: require("@assets/images/dashboard-inactive.png"),
  dashboardActive: require("@assets/images/dashboard-active.png"),
  myProfileInactive: require("@assets/images/my-profile-inactive.png"),
  myProfileActive: require("@assets/images/my-profile-active.png"),
  recordVisitInactive: require("@assets/images/record-visit-inactive.png"),
  recordVisitActive: require("@assets/images/record-visit-active.png"),
};

export type TabScreenParams = {
  [TabScreen.Home]: undefined;
  [TabScreen.RecordVisit]: undefined;
  [TabScreen.MyData]: undefined;
};

const Tab = createBottomTabNavigator<TabScreenParams>();

export function TabNavigator() {
  const { t } = useTranslation();

  const announcement = useSelector(selectAnnouncement);

  const initialTab = useInitialTab();

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      tabBarOptions={{
        style: { backgroundColor: colors.primaryBlack },
        activeTintColor: colors.yellow,
        inactiveTintColor: colors.white,
        keyboardHidesTabBar: true,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let imageSource: ImageSourcePropType | undefined;

          switch (route.name as keyof TabScreenParams) {
            case TabScreen.Home:
              imageSource = focused
                ? assets.dashboardActive
                : assets.dashboardInactive;
              break;
            case TabScreen.RecordVisit:
              imageSource = focused
                ? assets.recordVisitActive
                : assets.recordVisitInactive;
              break;
            case TabScreen.MyData:
              imageSource = focused
                ? assets.myProfileActive
                : assets.myProfileInactive;
              break;
          }

          if (imageSource) {
            const routeName = route.name;
            return (
              <TabBarIcon
                source={imageSource}
                routeName={routeName}
                showBadge={
                  route.name === TabScreen.Home && announcement != null
                }
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name={TabScreen.Home}
        component={Dashboard}
        options={{
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              accessibilityLabel={t("screenTitles:dashboard")}
              accessibilityHint={t("common:tab1of4")}
            />
          ),
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>{t("screenTitles:dashboard")}</TabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={TabScreen.RecordVisit}
        component={Scan}
        options={{
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              accessibilityLabel={t("screenTitles:recordVisit")}
              accessibilityHint={t("common:tab2of4")}
            />
          ),
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>
              {t("screenTitles:recordVisit")}
            </TabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name={TabScreen.MyData}
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              accessibilityLabel={t("screenTitles:myData")}
              accessibilityHint={t("common:tab4of4")}
            />
          ),
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>{t("screenTitles:myData")}</TabBarLabel>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
