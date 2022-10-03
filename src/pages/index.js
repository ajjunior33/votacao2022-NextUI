import { Card, Col, Container, Grid, Progress, Row, Text } from '@nextui-org/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function Home() {
  const [listCand, setListCad] = useState([]);
  const [percentageGeral, setPorcentageGeral] = useState(0);
  const handleData = () => {
    fetch(`https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json`)
      .then(response => response.json())
      .then(response => {
        setPorcentageGeral(parseFloat(response.pst))
        setListCad(response.cand)
      })
  }
  useEffect(() => {
    handleData()
    setInterval(() => {
      handleData()
    }, 3000);
  }, []);
  return (
    <>
      <Head>
        <title>Eleições | 1º turno | 2022</title>
      </Head>

      <Grid xs={12} sm={6} css={{ marginTop: 30, marginLeft: 'auto', marginRight: "auto", marginBottom: 30 }}>
        <Card isHoverable variant="bordered">
          <Card.Header>
            <Text>Apuração das urnas</Text>
          </Card.Header>
          <Card.Body>
            <Progress value={percentageGeral} shadow color="primary" css={{ width: "90%" }} status="primary" />
            <Text>{percentageGeral}%</Text>
          </Card.Body>
        </Card>
      </Grid>

      <Container gap={0}>
        <Grid.Container gap={3}>
          {listCand.map(cand => (
            <>
              <Grid xs={12} sm={6} md={4}>
                <Card css={{ background: '$blue400', padding: 25 }}>
                  <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
                    <Text size={20} color="#11181C">
                      {Buffer.from(cand.nm, 'utf8').toString()}
                    </Text>
                    <Text color={"#11181C"}>{parseInt(cand.vap).toLocaleString(undefined, { minimumFractionDigits: 0 })}</Text>
                  </Card.Header>
                  <Card.Body css={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <Grid css={{ width: "80%" }}>
                      <Text color="#11181C" size={14}>{cand.nv}</Text>
                      <Text color="#11181C" size={10}>{cand.cc}</Text>
                    </Grid>
                    <Grid css={{ width: 100 }}>
                      <CircularProgressbar
                        value={cand.pvap}
                        text={`${cand.pvap}%`}
                        strokeWidth={5}
                        minValue={0}
                        duration={1.4}
                        styles={buildStyles({
                          textColor: "#053B48",
                          pathColor: "#053B48",
                        })}
                      />
                    </Grid>
                  </Card.Body>
                </Card>
              </Grid>
            </>
          ))}

        </Grid.Container>

      </Container>

    </>
  )
}
