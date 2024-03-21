import CryptoJS from "crypto-js";
import { Col, Container, Row, setConfiguration } from "react-grid-system";
import BotCard from "../../components/botCard";
import { bots } from "../../data.json";

setConfiguration({
  gridColumns: 24,
  gutterWidth: 32,
  breakpoints: [640, 768, 1024, 1280, 1536, 1920],
});

function generateMD5(value: string) {
  return CryptoJS.MD5(value).toString();
}

function generateGravatarUrl(email: string) {
  const hash = generateMD5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${160}&d=robohash`;
}

const updatedBots = bots.map((bot) => {
  const newAvatarUrl = generateGravatarUrl(bot.botName);
  return { ...bot, avatarUrl: newAvatarUrl };
});

const Bots = () => {
  return (
    <div className="h-[90vh] w-[100vw] overflow-y-auto dark:bg-neutral-700">
      <Container className="min-h-full bg-gray-100 dark:bg-neutral-900">
        <Row className="min-h-full">
          <Col xs={24}>
            <h1 className="p-8 text-3xl dark:text-white">
              Select a Bot to Chat
            </h1>
          </Col>
          <Col xs={24} className="border-t-2 border-b dark:border-neutral-800">
            <Row className="px-8">
              {updatedBots.map((bot) => (
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                  xxl={6}
                  key={bot.botId}
                  className="my-8"
                >
                  <BotCard {...bot} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Bots;
