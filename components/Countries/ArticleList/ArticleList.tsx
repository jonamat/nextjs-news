import React, { FC } from "react";
import Image from "next/image";
import { Stack, Skeleton, Center, Box, Heading, Text } from "@chakra-ui/react";
import { Article, REQ_STATUS } from "@/interfaces";

interface Props {
  status: REQ_STATUS;
  articles?: Array<Article>;
  handleNewsClick: (article: Article) => any;
}

const ArticleList: FC<Props> = ({ articles, status, handleNewsClick }) => {
  switch (status) {
    case REQ_STATUS.IDLE:
    case REQ_STATUS.LOADING:
      return (
        <Stack spacing={4}>
          <Skeleton
            height="10vh"
            borderRadius={5}
            startColor="blue.50"
            endColor="blue.100"
          />
          <Skeleton
            height="10vh"
            borderRadius={5}
            startColor="blue.50"
            endColor="blue.100"
          />
          <Skeleton
            height="10vh"
            borderRadius={5}
            startColor="blue.50"
            endColor="blue.100"
          />
        </Stack>
      );

    case REQ_STATUS.ERROR:
      return (
        <Center>
          <Image src="/images/monke.png" width="auto" height="auto" />
        </Center>
      );

    case REQ_STATUS.SUCCESS:
      if (articles?.length) {
        return (
          <Stack spacing={4}>
            {articles.map((article, index) => (
              <Box
                key={index}
                p={4}
                shadow="sm"
                bg="blue.50"
                cursor="pointer"
                borderRadius={7}
                _dark={{ color: "blackAlpha.800" }}
                _hover={{ bgColor: "blue.100" }}
                onClick={() => handleNewsClick(article)}
              >
                <Heading size="sm" mb={2}>
                  Source: <i>{article.source.name}</i>
                </Heading>
                <Heading size="md" mb={3}>
                  {article.title}
                </Heading>
                <Text>{article.content}</Text>
              </Box>
            ))}
          </Stack>
        );
      } else {
        return <Text>I can't get the news for this country ☹</Text>;
      }
  }
};
export default ArticleList;
