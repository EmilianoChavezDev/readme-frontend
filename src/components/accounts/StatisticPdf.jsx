'use client'

import moment from "moment"
import { Document, Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer"

export default function StatisticPdf({ statistics, list, cardPercentages }) {

    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontSize: 12,
            color: '#555'
        },
        header: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'end',
            marginBottom: 15
        },
        card: {
            borderColor: '#8aeecb',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            padding: 10
        }
    })

    return (
        <Document>
          <Page style={styles.page}>
            <View style={styles.header}>
              <Image style={{ height: '20px' }} src={`/image/g2.png`} />
              <Text style={{ color: 'black' }}>Estadísticas de Cuenta {localStorage.getItem("username")}</Text>
              <Text>{moment().format('DD-MM-YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
              <View style={{ border: '1px solid #E1AFD1', width: '50%', borderRadius: 5, padding: 5 }}>
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 8 }}>{statistics?.cantidad_total_comentarios}</Text>
                <Text style={{ color: 'black', marginBottom: 8 }}>Comentarios</Text>
                <Text>
                    {`${statistics?.cantidad_comentarios_ultima_semana} / ${cardPercentages.comments}% más esta semana`}
                </Text>
              </View>
              <View style={{ border: '1px solid #8aeecb', width: '50%', borderRadius: 5, padding: 5 }}>
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 8 }}>{statistics?.cantidad_vistas_totales}</Text>
                <Text style={{ color: 'black', marginBottom: 8 }}>Favoritos</Text>
                <Text>
                  {`${statistics?.cantidad_favoritos_ultima_semana} / ${cardPercentages.favorites}% más esta semana`}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
              <View style={{ border: '1px solid #FFC6AC', width: '50%', borderRadius: 5, padding: 5 }}>
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 8 }}>{statistics?.cantidad_total_favoritos}</Text>
                <Text style={{ color: 'black', marginBottom: 8 }}>Vistas</Text>
                <Text>
                  {`${statistics?.cantidad_vistas_ultima_semana} / ${cardPercentages.views}% más esta semana`}
                </Text>
              </View>
              <View style={{ border: '1px solid #ECEE81', width: '50%', borderRadius: 5, padding: 5 }}>
                <Text style={{ color: 'black' }}>Edad Promedio de Lectores</Text>
                <Text>
                  {statistics?.edad_promedio? `${statistics?.edad_promedio} años` : 'Sin Datos'}
                </Text>
              </View>
            </View>
            {list.map((book, index) => (
              <View style={styles.card} key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
                  <Text style={{ color: 'black', fontSize: 14, marginBottom: 5 }}>{book.titulo?.length > 65? `${book.titulo.substring(0, 65)}...` : book.titulo}</Text>
                  <View style={{ flexDirection: 'row', gap: 5, marginBottom: 5 }}>
                    <Text style={{ color: 'black' }}>Calificación:</Text>
                    <Text>{book.puntuacion_media}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, marginBottom: 4 }}>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: 'black' }}>Categoría:</Text>
                    <Text>{book.categoria}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: 'black' }}>Usuarios que terminaron de leerlo:</Text>
                    <Text>{`${book.cantidad_usuarios_terminaron}/${book.cantidad_usuarios_leyeron}`}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, marginBottom: 5 }}>
                  <Text style={{ color: 'black' }}>Capítulos publicados:</Text>
                  <Text>{`${book.cantidad_capitulos_publicados}/${book.cantidad_capitulos}`}</Text>
                </View>
                <View style={{ borderTop: '1px solid #ccc' }}>
                  <Text style={{ color: 'black', marginBottom: 5 }}>Estadísticas de Lectura:</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {Object.keys(book.statistics).map((statistic_key, index) => 
                      <View key={index}>
                        <Text style={{ color: 'black' }}>{moment(statistic_key).format("DD-MM")}</Text>
                        <Text>{book.statistics[statistic_key]}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </Page>
        </Document>
    )

}