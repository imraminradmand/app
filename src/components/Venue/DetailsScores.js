import { forOwn } from "lodash";
import { number, shape, string } from "prop-types";
import React from "react";
import { intlShape } from "react-intl";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import Icon from "../Icon";
import { colors, media, fonts, fontWeight, fontSize } from "../../styles";

import messages from "./messages";

const MainReviewColumn = styled.div`
  display: block;
  position: relative;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 0;
  width: 100%;
  border: 1px solid #e3e1e0;
  border-left: none;
`;

const Title = styled.h1`
  margin: 0 0;
  padding: 0.5rem 0;
  width: 100%;

  color: ${colors.white} !important;
  font-family: ${fonts.primary} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold}!important;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid black;
  background: ${colors.black};
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkestGrey};
  font-family: ${fonts.primary} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold}!important;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  margin-bottom: 15px;
`;

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SectionWrapper = styled.div`
  display: block;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ScoreBox = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  height: 125px
  margin-right: 0px;
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.buttonColor};
  text-align: center;
  position: relative;
  overflow: hidden;

  ${media.desktop`
    height: 145px;
  `};
`;

const Count = styled.p`
  margin: 5 0 0 0;
  width: 100%;
  display: block;
  color: ${colors.black};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
  text-align: center;
  position: relative;
`;

const ReviewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-family: ${fonts.primary};
  padding: 25px 15px;
  background-color: ${colors.gray100};
`;

const SectionDefault = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.medium};
  background-color: ${colors.gray100};
  margin: 0 auto;
  padding: 5% 0 25% 0;
`;

const Caption = styled.div`
  display: block;
  text-transform: uppercase;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
`;
const ScoreDescription = styled.div`
  display: block;
  text-align: center;
  padding: 5px 15px;
  width: auto;

  ${media.desktop`
    width: 85%;
    margin: 0 auto;
  `};
`;
const Collapsible = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  text-decoration: underline;
  text-transform: uppercase;
`;

const CollapsedContent = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
`;

const CollapsedTitle = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold};
  text-transform: uppercase;
`;
const CollapsedDescription = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-family: ${fonts.tertiary};
  font-size: ${fontSize.base};
`;
const mainReviewButtonStyles = () => `
  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: none;
  box-shadow: none;
  height: 3rem;
  margin-right: 0.8rem;
  padding: 0;

  background-color: transparent;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const StepButton = styled.div`
  ${mainReviewButtonStyles};
  width: 130px;
  text-align: center;
  position: absolute !important;
  top: 16% !important;
  right: 28% !important;

  ${media.desktop`
    top: 21% !important;
    right: 35% !important;
  `};
`;

export default class DetailsScores extends React.Component {
  static propTypes = {
    entryScore: number,
    entryReviews: number,
    bathroomScore: number,
    bathroomReviews: number,
    interiorScore: number,
    interiorReviews: number,
    noReview: string,
    steps: shape({
      zero: number,
      one: number,
      two: number,
      moreThanTwo: number
    }),
    allowsGuideDog: shape({
      yes: number,
      no: number
    }),
    hasParking: shape({
      yes: number,
      no: number
    }),
    hasSecondEntry: shape({
      yes: number,
      no: number
    }),
    hasWellLit: shape({
      yes: number,
      no: number
    }),
    isQuiet: shape({
      yes: number,
      no: number
    }),
    isSpacious: shape({
      yes: number,
      no: number
    }),
    hasPermanentRamp: shape({
      yes: number,
      no: number
    }),
    hasPortableRamp: shape({
      yes: number,
      no: number
    }),
    has0Steps: shape({
      yes: number,
      no: number
    }),
    has1Step: shape({
      yes: number,
      no: number
    }),
    has2Steps: shape({
      yes: number,
      no: number
    }),
    has3Steps: shape({
      yes: number,
      no: number
    }),
    hasWideEntrance: shape({
      yes: number,
      no: number
    }),
    hasAccessibleTableHeight: shape({
      yes: number,
      no: number
    }),
    hasAccessibleElevator: shape({
      yes: number,
      no: number
    }),
    hasInteriorRamp: shape({
      yes: number,
      no: number
    }),
    hasSwingInDoor: shape({
      yes: number,
      no: number
    }),
    hasSwingOutDoor: shape({
      yes: number,
      no: number
    }),
    hasLargeStall: shape({
      yes: number,
      no: number
    }),
    hasTallSinks: shape({
      yes: number,
      no: number
    }),
    hasLoweredSinks: shape({
      yes: number,
      no: number
    }),
    hasNoSupportAroundToilet: shape({
      yes: number,
      no: number
    }),
    hasOneBarAroundToilet: shape({
      yes: number,
      no: number
    }),
    hasTwoBarAroundToilet: shape({
      yes: number,
      no: number
    })
  };

  static contextTypes = {
    intl: intlShape
  };

  state = {
    section: 0,
    expandPermanentRamp: false,
    expandThreeStep: false,
    expandTwoStep: false,
    expandOneStep: false,
    expandNoSteps: false,
    expandPortableRamp: false,
    expandParking: false,
    expandRoomToMove: false,
    expandSecondEntry: false,
    expandWideEntrance: false,
    expandAccessibleTableHeight: false,
    expandHighNoiseLevel: false,
    expandGuideDog: false,
    expandAccessibleElevator: false,
    expandInteriorRamp: false,
    expandDoorSwingsIn: false,
    expandDoorSwingsOut: false,
    expandAverageStalls: false,
    expandLargeStalls: false,
    expandedTallSinks: false,
    expandedLoweredSinks: false,
    expandBrightLight: false
  };

  componentWillMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  changeSection = value => {
    let sectionSelected;
    if (value === "interior") sectionSelected = 2;
    else if (value === "restroom") sectionSelected = 3;
    else if (value === "entry") sectionSelected = 1;
    else sectionSelected = 0;

    this.setState({
      section: parseInt(sectionSelected)
    });
  };

  toggleBrightLight = value => {
    this.setState({
      expandBrightLight: !this.state.expandBrightLight || false
    });
  };

  togglePermanentRamp = value => {
    this.setState({
      expandPermanentRamp: !this.state.expandPermanentRamp || false
    });
  };

  toggleExpandThreeStep = value => {
    this.setState({ expandThreeStep: !this.state.expandThreeStep || false });
  };

  toggleExpandTwoStep = value => {
    this.setState({ expandTwoStep: !this.state.expandTwoStep || false });
  };

  toggleExpandOneStep = value => {
    this.setState({ expandOneStep: !this.state.expandOneStep || false });
  };

  toggleExpandNoSteps = value => {
    this.setState({ expandNoSteps: !this.state.expandNoSteps || false });
  };

  togglePortableRamp = value => {
    this.setState({
      expandPortableRamp: !this.state.expandPortableRamp || false
    });
  };

  toggleParking = value => {
    this.setState({ expandParking: !this.state.expandParking || false });
  };

  toggleRoomToMove = value => {
    this.setState({ expandRoomToMove: !this.state.expandRoomToMove || false });
  };

  toggleSecondEntry = value => {
    this.setState({
      expandSecondEntry: !this.state.expandSecondEntry || false
    });
  };

  toggleWideEntrance = value => {
    this.setState({
      expandWideEntrance: !this.state.expandWideEntrance || false
    });
  };

  toggleAccessibleTableHeight = value => {
    this.setState({
      expandAccessibleTableHeight:
        !this.state.expandAccessibleTableHeight || false
    });
  };

  toggleHighNoiseLevel = value => {
    this.setState({
      expandHighNoiseLevel: !this.state.expandHighNoiseLevel || false
    });
  };

  toggleGuideDog = value => {
    this.setState({ expandGuideDog: !this.state.expandGuideDog || false });
  };

  toggleAccessibleElevator = value => {
    this.setState({
      expandAccessibleElevator: !this.state.expandAccessibleElevator || false
    });
  };

  toggleInteriorRamp = value => {
    this.setState({
      expandInteriorRamp: !this.state.expandInteriorRamp || false
    });
  };

  toggleDoorSwingsIn = value => {
    this.setState({
      expandDoorSwingsIn: !this.state.expandDoorSwingsIn || false
    });
  };

  toggleDoorSwingsOut = value => {
    this.setState({
      expandDoorSwingsOut: !this.state.expandDoorSwingsOut || false
    });
  };

  toggleAverageStalls = value => {
    this.setState({
      expandAverageStalls: !this.state.expandAverageStalls || false
    });
  };

  toggleLargeStalls = value => {
    this.setState({
      expandLargeStalls: !this.state.expandLargeStalls || false
    });
  };

  toggleTallSinks = value => {
    this.setState({
      expandedTallSinks: !this.state.expandedTallSinks || false
    });
  };

  toggleLoweredSinks = value => {
    this.setState({
      expandedLoweredSinks: !this.state.expandedLoweredSinks || false
    });
  };

  render() {
    const { formatMessage } = this.context.intl;

    // Entrance
    const maxEntryDetails = 9;
    let venueEntryDetails = 0;
    const entryCarouselDetails = [];
    let entranceDetailsCopy;
    let entryScoreBox = (
      <ScoreBox>
        <Icon
          glyph="entrylg"
          size={4}
          alt="Entrance"
          color={colors.buttonColor}
          className="h-full"
        />
      </ScoreBox>
    );
    if (this.props.entryScore >= 1 && this.props.entryScore < 3) {
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          textColor={colors.black}
          className={`score_alert ${
            this.state.section === 1 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("entry")}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
          </Button>
        </ScoreBox>
      );
      entranceDetailsCopy = (
        <SectionDefault>
          {this.context.intl.formatMessage(messages.noEntryDetailsAlertMessage)}
        </SectionDefault>
      );
    } else if (this.props.entryScore >= 3 && this.props.entryScore < 4) {
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          textColor={colors.black}
          className={`score_caution ${
            this.state.section === 1 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("entry")}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
          </Button>
        </ScoreBox>
      );
      entranceDetailsCopy = (
        <SectionDefault>
          {this.context.intl.formatMessage(
            messages.noEntryDetailsCautionMessage
          )}
        </SectionDefault>
      );
    } else if (this.props.entryScore >= 4 && this.props.entryScore <= 5) {
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          textColor={colors.black}
          className={`score_accessible ${
            this.state.section === 1 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("entry")}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
          </Button>
        </ScoreBox>
      );
      entranceDetailsCopy = (
        <SectionDefault>
          {formatMessage(messages.noEntryDetailsAccessibleMessage)}
        </SectionDefault>
      );
    }

    for (let i = 1; i <= maxEntryDetails; i += 1) {
      venueEntryDetails = i - 1;
      let eCDetails;
      if (
        this.props.hasPermanentRamp &&
        this.props.hasPermanentRamp.yes &&
        this.props.hasPermanentRamp.yes > this.props.hasPermanentRamp.no
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>{formatMessage(messages.permanentRamp)}</SectionTitle>
            <SectionWrapper>
              <ScoreBox textColor={colors.black} className="bg-transparent">
                <Icon
                  glyph="permanentRamp"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.permanentRampDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  id="expandPermanentRamp"
                  onClick={this.togglePermanentRamp}
                >
                  {this.state.expandPermanentRamp ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandPermanentRamp ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandPermanentRamp ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.permanentRampWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasPortableRamp &&
        this.props.hasPortableRamp.yes &&
        this.props.hasPortableRamp.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              Entrance {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.portableRampTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="portableRamp"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.portableRampDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.togglePortableRamp}>
                  {this.state.expandPortableRamp ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandPortableRamp ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandPortableRamp ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.portableRampWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.has0Steps &&
        this.props.has0Steps.yes &&
        this.props.has0Steps.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>{formatMessage(messages.noStepsTitle)}</SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="steps"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
                <StepButton>
                  <Icon
                    glyph="zero"
                    size={2.5}
                    color={
                      this.state.steps === 0 ? colors.primary : colors.white
                    }
                  />
                </StepButton>
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.noStepsDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  onClick={this.toggleExpandNoSteps}
                >
                  {this.state.expandNoSteps ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandNoSteps ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandNoSteps ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.noStepsWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.has1Step &&
        this.props.has1Step.yes &&
        this.props.has1Step.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>{formatMessage(messages.oneStepTitle)}</SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="steps"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
                <StepButton>
                  <Icon
                    glyph="one"
                    size={2.5}
                    color={
                      this.state.steps === 0 ? colors.primary : colors.white
                    }
                  />
                </StepButton>
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.oneStepDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  onClick={this.toggleExpandOneStep}
                >
                  {this.state.expandOneStep ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandOneStep ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandOneStep ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.noStepsWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.has2Steps &&
        this.props.has2Steps.yes &&
        this.props.has2Steps.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>{formatMessage(messages.twoStepsTitle)}</SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="steps"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
                <StepButton>
                  <Icon
                    glyph="two"
                    size={2.5}
                    color={
                      this.state.steps === 0 ? colors.primary : colors.white
                    }
                  />
                </StepButton>
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.twoStepsDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  onClick={this.toggleExpandTwoStep}
                >
                  {this.state.expandTwoStep ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandTwoStep ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandTwoStep ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.noStepsWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.has3Steps &&
        this.props.has3Steps.yes &&
        this.props.has3Steps.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.threeStepsTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="steps"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
                <StepButton>
                  <Icon
                    glyph="moreThanTwo"
                    size={2.5}
                    color={
                      this.state.steps === 0 ? colors.primary : colors.white
                    }
                  />
                </StepButton>
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.threeStepsDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  onClick={this.toggleExpandThreeStep}
                >
                  {this.state.expandThreeStep ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandThreeStep ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandThreeStep ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.noStepsWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasParking &&
        this.props.hasParking.yes &&
        this.props.hasParking.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.reservedParkingTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox textColor={colors.white} className="box__dark">
                <Icon
                  glyph="parking"
                  size={6}
                  className="fill-current text-white"
                  aria-hidden="true"
                  alt=" "
                  color={colors.white}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.reservedParkingDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleParking}>
                  {this.state.expandParking ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandParking ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandParking ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.reservedParkingWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasSecondEntry &&
        this.props.hasSecondEntry.yes &&
        this.props.hasSecondEntry.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.secondEntryTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="secondEntry"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.secondEntryDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleSecondEntry}>
                  {this.state.expandSecondEntry ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandSecondEntry ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandSecondEntry ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.secondEntryWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasWideEntrance &&
        this.props.hasWideEntrance.yes &&
        this.props.hasWideEntrance.yes !== 0
      ) {
        eCDetails = (
          <Slide index={venueEntryDetails}>
            <Caption>
              {formatMessage(messages.entrance)} {i}
              /
              {maxEntryDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.wideEntranceTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="wideEntry"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.wideEntranceDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleWideEntrance}>
                  {this.state.expandWideEntrance ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandWideEntrance ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandWideEntrance ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.wideEntranceWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      }

      if (eCDetails) {
        entryCarouselDetails.push(eCDetails);
      }
    }

    // Bathroom
    const maxBathroomDetails = 5;
    let venueBathroomDetail = 0;
    const bathroomCarouselDetails = [];
    let bathroomDetailsCopy;
    let bathroomScoreBox = (
      <ScoreBox>
        <Icon
          glyph="restroom"
          size={4}
          alt="Restroom"
          className="h-full"
          color={colors.buttonColor}
        />
      </ScoreBox>
    );
    if (this.props.bathroomScore >= 1 && this.props.bathroomScore < 3) {
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          className={`score_alert ${
            this.state.section === 3 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("restroom")}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
          </Button>
        </ScoreBox>
      );
      bathroomDetailsCopy = (
        <SectionDefault>
          {this.context.intl.formatMessage(
            messages.noRestroomDetailsAlertMessage
          )}
        </SectionDefault>
      );
    } else if (this.props.bathroomScore >= 3 && this.props.bathroomScore < 4) {
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          className={`score_caution ${
            this.state.section === 3 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("restroom")}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
          </Button>
        </ScoreBox>
      );
      bathroomDetailsCopy = (
        <SectionDefault>
          {this.context.intl.formatMessage(
            messages.noRestroomDetailsCautionMessage
          )}
        </SectionDefault>
      );
    } else if (this.props.bathroomScore >= 4 && this.props.bathroomScore <= 5) {
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          className={`score_accessible ${
            this.state.section === 3 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("restroom")}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
          </Button>
        </ScoreBox>
      );
      bathroomDetailsCopy = (
        <SectionDefault>
          {this.context.intl.formatMessage(
            messages.noRestroomDetailsAccessibleMessage
          )}
        </SectionDefault>
      );
    }

    for (let i = 1; i <= maxEntryDetails; i += 1) {
      venueBathroomDetail = i - 1;
      let eCDetails;
      if (
        this.props.hasSwingInDoor &&
        this.props.hasSwingInDoor.yes &&
        this.props.hasSwingInDoor.yes > this.props.hasSwingInDoor.no
      ) {
        eCDetails = (
          <Slide index={venueBathroomDetail}>
            <Caption>
              {formatMessage(messages.bathroomTitle)} {i}
              /
              {maxBathroomDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.doorSwingsInTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="doorSwingsIn"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.doorSwingsInDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleDoorSwingsIn}>
                  {this.state.expandDoorSwingsIn ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                    </span>
                  ) : null}
                  {!this.state.expandDoorSwingsIn ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandDoorSwingsIn ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.doorSwingsInWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasSwingOutDoor &&
        this.props.hasSwingOutDoor.yes &&
        this.props.hasSwingOutDoor.yes > this.props.hasSwingOutDoor.no
      ) {
        eCDetails = (
          <Slide index={venueBathroomDetail}>
            <Caption>
              {formatMessage(messages.bathroomTitle)} {i}
              /
              {maxBathroomDetails}
            </Caption>

            <SectionTitle>
              {formatMessage(messages.doorSwingsOutTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="doorSwingsOut"
                  size={6}
                  className="fill-current text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.doorSwingsOutDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button
                  className="text-link"
                  onClick={this.toggleDoorSwingsOut}
                >
                  {this.state.expandDoorSwingsOut ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                      a
                    </span>
                  ) : null}
                  {!this.state.expandDoorSwingsOut ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandDoorSwingsOut ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.doorSwingsOutWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasLargeStall &&
        this.props.hasLargeStall.yes &&
        this.props.hasLargeStall.yes > this.props.hasLargeStall.no
      ) {
        eCDetails = (
          <Slide index={venueBathroomDetail}>
            <Caption>
              {formatMessage(messages.bathroomTitle)} {i}
              /
              {maxBathroomDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.largeStallsTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="stallLarge"
                  size={6}
                  className="text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.largeStallsDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleLargeStalls}>
                  {this.state.expandLargeStalls ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                      a
                    </span>
                  ) : null}
                  {!this.state.expandLargeStalls ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandLargeStalls ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.largeStallsWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasTallSinks &&
        this.props.hasTallSinks.yes &&
        this.props.hasTallSinks.yes > this.props.hasTallSinks.no
      ) {
        eCDetails = (
          <Slide index={venueBathroomDetail}>
            <Caption>
              {formatMessage(messages.bathroomTitle)} {i}
              /
              {maxBathroomDetails}
            </Caption>
            <SectionTitle>
              {formatMessage(messages.tallSinksTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="sinkTall"
                  size={6}
                  className="text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.tallSinksDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleTallSinks}>
                  {this.state.expandedTallSinks ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                      a
                    </span>
                  ) : null}
                  {!this.state.expandedTallSinks ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandedTallSinks ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.tallSinksWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      } else if (
        this.props.hasLoweredSinks &&
        this.props.hasLoweredSinks.yes &&
        this.props.hasLoweredSinks.yes > this.props.hasLoweredSinks.no
      ) {
        eCDetails = (
          <Slide index={venueBathroomDetail}>
            <Caption>
              {formatMessage(messages.bathroomTitle)} {i}
              /
              {maxBathroomDetails}
            </Caption>

            <SectionTitle>
              {formatMessage(messages.loweredSinksTitle)}
            </SectionTitle>
            <SectionWrapper>
              <ScoreBox className="bg-transparent" textColor={colors.black}>
                <Icon
                  glyph="sinkLowered"
                  size={6}
                  className="text-black"
                  aria-hidden="true"
                  alt=" "
                  color={colors.black}
                />
              </ScoreBox>
              <ScoreDescription>
                {formatMessage(messages.loweredSinksDescription)}
              </ScoreDescription>
              <Collapsible>
                <Button className="text-link" onClick={this.toggleLoweredSinks}>
                  {this.state.expandedLoweredSinks ? (
                    <span className="close">
                      {formatMessage(messages.close)}
                      a
                    </span>
                  ) : null}
                  {!this.state.expandedLoweredSinks ? (
                    <span className="open">
                      {formatMessage(messages.moreInfo)}
                    </span>
                  ) : null}
                </Button>
              </Collapsible>
              {this.state.expandedLoweredSinks ? (
                <CollapsedContent>
                  <CollapsedTitle>{formatMessage(messages.why)}</CollapsedTitle>
                  <CollapsedDescription>
                    {formatMessage(messages.loweredSinksWhyDescription)}
                  </CollapsedDescription>
                </CollapsedContent>
              ) : null}
            </SectionWrapper>
          </Slide>
        );
      }

      if (eCDetails) {
        bathroomCarouselDetails.push(eCDetails);
      }
    }

    // Interior
    let stepsNumber = "stepsUnknown";
    let stepsReviews = 0;
    const maxSteps = { value: 0, key: "" };
    forOwn(this.props.steps, (value, key) => {
      stepsReviews += value;
      if (value > maxSteps.value) {
        maxSteps.value = value;
        maxSteps.key = key;
      }
    });

    const maxInteriorDetails = 7;
    const venueInteriorDetails = 0;
    const interiorCarouselDetails = [];
    let interiorDetailsCopy;
    let stepsScoreBox = (
      <ScoreBox>
        <Icon
          glyph="interior"
          size={7}
          alt="Interior"
          className="h-full"
          color={colors.buttonColor}
        />
      </ScoreBox>
    );
    if (maxSteps.key === "zero") {
      stepsNumber = "stepsZero";
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          className={`score_accessible ${
            this.state.section === 2 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("interior")}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
            <Count>
              {formatMessage(messages.count, {
                count: stepsReviews
              })}
            </Count>
          </Button>
        </ScoreBox>
      );
    } else if (maxSteps.key === "one" || maxSteps.key === "two") {
      stepsNumber = maxSteps.key === "one" ? "stepsOne" : "stepsTwo";
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          className={`score_caution ${
            this.state.section === 2 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("interior")}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
            <Count>
              {formatMessage(messages.count, {
                count: stepsReviews
              })}
            </Count>
          </Button>
        </ScoreBox>
      );
    } else if (maxSteps.key === "moreThanTwo") {
      stepsNumber = "stepsMoreThanTwo";
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          className={`score_alert ${
            this.state.section === 2 ? "is-active-score" : ""
          }`}
        >
          <Button onClick={() => this.changeSection("interior")}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
          </Button>
        </ScoreBox>
      );
    }

    return (
      <div>
        <Grid container>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.entryTitle)}</Title>
              <ScoreWrapper>{entryScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.stepsTitle)}</Title>
              <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.bathroomTitle)}</Title>
              <ScoreWrapper>{bathroomScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ReviewsWrapper>
              {/* Default state */}
              {this.state.section === 0 ? (
                <SectionDefault>
                  {(this.props.bathroomScore === 0 &&
                    this.props.entryScore === 0 &&
                    this.props.interiorScore === 0) ||
                  ((this.props.bathroomScore === null ||
                    this.props.bathroomScore === undefined) &&
                    (this.props.entryScore === null ||
                      this.props.entryScore === undefined) &&
                    (this.props.interiorScore === null ||
                      this.props.interiorScore === undefined)) ? (
                    <div>{formatMessage(messages.noRatingsMessage)}</div>
                  ) : (
                    <div>{formatMessage(messages.scoreDetailsMessage)}</div>
                  )}
                </SectionDefault>
              ) : null}

              {/* Entry */}
              {this.state.section === 1 ? (
                <div className="is-full">
                  {entryCarouselDetails.length > 0 ? (
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={100}
                      totalSlides={9}
                      visibleSlides={1}
                      data-carousel="entry"
                      className="details-carousel"
                    >
                      <Slider>{entryCarouselDetails}</Slider>
                      <ButtonBack>
                        <span className="_hide-visual">Back</span>
                        <i>
                          <Icon glyph="chevronLeft" size={1} />
                        </i>
                      </ButtonBack>
                      <ButtonNext>
                        <span className="_hide-visual">Next</span>
                        <i>
                          <Icon glyph="chevronRight" size={1} />
                        </i>
                      </ButtonNext>
                    </CarouselProvider>
                  ) : null}

                  {entryCarouselDetails.length === 0 ? (
                    <div className="text-center is-full">
                      {entranceDetailsCopy}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {/* Interior */}
              {this.state.section === 2 ? (
                <div className="is-full">
                  {interiorCarouselDetails.length > 0 ? (
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={7}
                      visibleSlides={1}
                      data-carousel="interior"
                      className="details-carousel"
                    >
                      <Slider>{interiorCarouselDetails}</Slider>
                      <ButtonBack>
                        <span className="_hide-visual">Back</span>
                        <i>
                          <Icon glyph="chevronLeft" size={1} />
                        </i>
                      </ButtonBack>
                      <ButtonNext>
                        <span className="_hide-visual">Next</span>
                        <i>
                          <Icon glyph="chevronRight" size={1} />
                        </i>
                      </ButtonNext>
                    </CarouselProvider>
                  ) : null}

                  {interiorCarouselDetails.length === 0 ? (
                    <div className="text-center is-full">
                      {interiorDetailsCopy}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Restroom */}
              {this.state.section === 3 ? (
                <div className="is-full">
                  {bathroomCarouselDetails.length > 0 ? (
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={6}
                      visibleSlides={1}
                      data-carousel="restroom"
                      className="details-carousel"
                    >
                      <Slider>{bathroomCarouselDetails}</Slider>
                      <ButtonBack>
                        <span className="_hide-visual">Back</span>
                        <i>
                          <Icon glyph="chevronLeft" size={1} />
                        </i>
                      </ButtonBack>
                      <ButtonNext>
                        <span className="_hide-visual">Next</span>
                        <i>
                          <Icon glyph="chevronRight" size={1} />
                        </i>
                      </ButtonNext>
                    </CarouselProvider>
                  ) : null}

                  {bathroomCarouselDetails.length === 0 ? (
                    <div className="text-center is-full">
                      {bathroomDetailsCopy}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </ReviewsWrapper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
